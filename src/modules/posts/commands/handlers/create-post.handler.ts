import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../create-post.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../entities/post.entity';

import { User } from '../../../auth/entities/user.entity';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: CreatePostCommand): Promise<Post> {
    const { createPostDto, authorId } = command;
    const author = await this.userRepository.findOneBy({ id: authorId });
    if (!author) throw new Error('Author not found');

    const post = this.postRepository.create({
      ...createPostDto,
      author,
    });

    return this.postRepository.save(post);
  }
}
