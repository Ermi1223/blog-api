// src/modules/comments/queries/get-comments-by-post.query.ts
export class GetCommentsByPostQuery {
    constructor(public readonly postId: number, public readonly page: number, public readonly limit: number) {}
  }
  