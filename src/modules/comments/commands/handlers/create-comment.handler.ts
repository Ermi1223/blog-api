import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommentCommand } from '../create-comment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../entities/comment.entity';
import { Post } from '../../../posts/entities/post.entity';
import { User } from '../../../auth/entities/user.entity';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: CreateCommentCommand): Promise<Comment> {
    const { createCommentDto, authorId } = command;

    // Find the post related to this comment
    const post = await this.postRepository.findOneBy({ id: createCommentDto.postId });
    if (!post) {
      throw new Error('Post not found');
    }

    // Find the author who is creating the comment
    const author = await this.userRepository.findOneBy({ id: authorId });
    if (!author) {
      throw new Error('Author not found');
    }

    // Create new comment entity
    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      post,
      author,
    });

    // Save the comment in DB and return
    return await this.commentRepository.save(comment);
  }
}
