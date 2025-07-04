import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Nice post!', description: 'Content of the comment' })
  content: string;

  @ApiProperty({ example: 1, description: 'ID of the post to comment on' })
  postId: number;
}
