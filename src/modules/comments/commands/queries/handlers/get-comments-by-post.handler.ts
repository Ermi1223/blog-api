// src/modules/comments/queries/handlers/get-comments-by-post.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../../entities/comment.entity';
import { GetCommentsByPostQuery } from '../get-comments-by-post.query';

@QueryHandler(GetCommentsByPostQuery)
export class GetCommentsByPostHandler implements IQueryHandler<GetCommentsByPostQuery> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async execute(query: GetCommentsByPostQuery) {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const [comments, total] = await this.commentRepository.findAndCount({
      where: { post: { id: query.postId } },
      relations: ['author', 'post'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: comments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
