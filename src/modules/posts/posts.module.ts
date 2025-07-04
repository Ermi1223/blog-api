import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Post } from './entities/post.entity';
import { User } from '../auth/entities/user.entity';
import { PostsController } from './controllers/posts.controller';
import { CreatePostHandler } from './commands/handlers/create-post.handler';
import { GetPostsHandler } from './queries/handlers/get-posts.handler'; 
import { GetPostHandler } from './queries/handlers/get-post.handler';


@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), CqrsModule],
  controllers: [PostsController],
  providers: [
    CreatePostHandler,
    GetPostsHandler, 
    GetPostHandler,
  ],
})
export class PostsModule {}
