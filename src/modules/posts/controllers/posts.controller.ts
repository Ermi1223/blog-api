import {
  Controller,
  Post as HttpPost,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../../shared/jwt-auth.guard';
import { CreatePostDto } from '../dtos/create-post.dto';
import { CreatePostCommand } from '../commands/create-post.command';
import { GetPostQuery } from '../queries/get-post.query';
import { GetPostsQuery } from '../queries/get-posts.query';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Request as ExpressRequest } from 'express';  


interface JwtPayload {
  userId: number;
  username: string;
}

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpPost()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createPost(
    @Body() dto: CreatePostDto,
    @Request() req: ExpressRequest & { user: JwtPayload },  
  ) {
    const authorId = req.user.userId;  
    return this.commandBus.execute(new CreatePostCommand(dto, authorId));
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated list of posts' })
  @ApiResponse({ status: 200, description: 'List of posts' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getPosts(@Query() query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return this.queryBus.execute(new GetPostsQuery(page, limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({ status: 200, description: 'Post fetched successfully' })
  async getPost(@Param('id') id: number) {
    return this.queryBus.execute(new GetPostQuery(id));
  }
}
