import CommentItem from "./comment-item"

export default function CommentFeed({ comments = [] }: { comments?: Record<string, any>[] }) {
   return (
      <>
         {comments.map((comment: Record<string, any>) => (
            <CommentItem key={comment.id} data={comment} />
         ))}
      </>
   )
}
