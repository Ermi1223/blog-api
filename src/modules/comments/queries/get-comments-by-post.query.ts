
export class GetCommentsByPostQuery {
  constructor(public readonly postId: number, public readonly page: number, public readonly limit: number) {}
}
