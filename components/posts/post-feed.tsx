import usePosts from '@/hooks/use-posts'

import PostItem from './post-item'

export default function PostFeed({ userId }: { userId?: string }) {
   const { data: posts = [] } = usePosts(userId)

   return (
      <>
         {posts.map((post: Record<string, any>) => (
            <PostItem userId={userId} key={post.id} data={post} />
         ))}
      </>
   )
}
