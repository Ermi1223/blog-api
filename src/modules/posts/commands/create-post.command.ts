import { CreatePostDto } from '../dtos/create-post.dto';

export class CreatePostCommand {
  constructor(
    public readonly createPostDto: CreatePostDto,
    public readonly authorId: number,
  ) {}
}
