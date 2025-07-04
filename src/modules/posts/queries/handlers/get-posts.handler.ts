import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Import GetPostsQuery from the parent queries folder
import { GetPostsQuery } from '../get-posts.query';

// Import Post entity from the entities folder, which is two levels up
import { Post } from '../../entities/post.entity';


@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async execute(query: GetPostsQuery) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const [posts, total] = await this.postRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['author'],
      order: { id: 'DESC' },
    });

    return {
      data: posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
