import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPostQuery } from '../get-post.query';
import { Post } from '../../entities/post.entity';

@QueryHandler(GetPostQuery)
export class GetPostHandler implements IQueryHandler<GetPostQuery> {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async execute(query: GetPostQuery): Promise<Post | null> {
    const post = await this.postRepository.findOne({
      where: { id: query.id },
      relations: ['author'],  // Include 'author' relation if needed
    });

    return post;
  }
}
