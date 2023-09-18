import { useRouter } from 'next/router'
import { ClipLoader } from 'react-spinners'

import usePost from '@/hooks/use-post'

import Header from '@/components/general/header'
import Form from '@/components/general/form'
import PostItem from '@/components/posts/post-item'
import CommentFeed from '@/components/posts/comment-feed'
import Head from 'next/head'

export default function PostView() {
  const router = useRouter()
  const { postId } = router.query

  const { data: fetchedPost, isLoading } = usePost(postId as string)

  if (isLoading || !fetchedPost) {
    return (
      <div className='flex items-center justify-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Twitter | Post</title>
        <meta name='description' content='Twitter for sharing events each other' />
      </Head>

      <Header showBackArrow label='Tweet' />
      <PostItem data={fetchedPost} />
      <Form postId={postId as string} isComment placeholder='Tweet your reply' />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  )
}
