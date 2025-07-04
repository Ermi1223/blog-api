import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  // Create a post
  async create(dto: { title: string; content: string }, authorId: number): Promise<Post> {
    const post = this.postsRepository.create({
      ...dto,
      author: { id: authorId } as any,  // Cast to 'any' to avoid circular issues
    });
    return this.postsRepository.save(post);
  }

  // Get all posts
  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['author'] });
  }

  // Get a single post by ID
  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }
}
