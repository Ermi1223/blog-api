import { Controller, Post as HttpPost, Body, UseGuards, Request, Get, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../../shared/jwt-auth.guard';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { CreateCommentCommand } from '../commands/create-comment.command';
import { GetCommentsByPostQuery } from '../queries/get-comments-by-post.query';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Request as ExpressRequest } from 'express';

// Define interface for request user (optional but recommended)
interface JwtRequest extends ExpressRequest {
  user: { userId: number; username?: string; /* other user props */ };
}

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpPost()
  @ApiOperation({ summary: 'Add a comment to a post' })
  @ApiResponse({ status: 201, description: 'Comment added successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async addComment(@Body() dto: CreateCommentDto, @Request() req: JwtRequest) {
    const authorId = req.user.userId;
    return this.commandBus.execute(new CreateCommentCommand(dto, authorId));
  }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Get paginated comments for a post' })
  @ApiResponse({ status: 200, description: 'List of comments' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getComments(@Param('postId') postId: number, @Query() query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return this.queryBus.execute(new GetCommentsByPostQuery(postId, page, limit));
  }
}
