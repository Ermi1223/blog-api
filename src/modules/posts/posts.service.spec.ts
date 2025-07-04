import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';


describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should create a post', async () => {
    const dto = { title: 'Test', content: 'Test content' };
    const authorId = 1;

    const user = new User();
    user.id = authorId;
    user.username = 'testuser';
    user.password = 'hashedpassword';
    // We skip hashPassword & validatePassword since they’re not needed here

    const savedPost: Post = {
      id: 1,
      title: dto.title,
      content: dto.content,
      author: user,
    } as Post;

    jest.spyOn(repository, 'save').mockResolvedValue(savedPost);

    const result = await service.create(dto, authorId);

    expect(result).toHaveProperty('id');
    expect(result.title).toBe('Test');
    expect(result.author.id).toBe(authorId);
  });
});
