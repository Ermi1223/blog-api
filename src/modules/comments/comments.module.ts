import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { Comment } from './entities/comment.entity';
import { Post } from '../posts/entities/post.entity';
import { User } from '../auth/entities/user.entity';

import { CommentsController } from './controllers/comments.controller';
import { CreateCommentHandler } from './commands/handlers/create-comment.handler';
import { GetCommentsByPostHandler } from './queries/handlers/get-comments-by-post.handler';


@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Post, User]),
    CqrsModule,
  ],
  controllers: [CommentsController],
  providers: [CreateCommentHandler, GetCommentsByPostHandler],
})
export class CommentsModule {}
