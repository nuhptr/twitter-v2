import { useRouter } from 'next/router'
import { ClipLoader } from 'react-spinners'

import usePost from '@/hooks/usePost'

import Header from '@/components/Header'
import Form from '@/components/Form'
import PostItem from '@/components/posts/PostItem'
import CommentFeed from '@/components/posts/CommentFeed'
import Head from 'next/head'

const PostView = () => {
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
        <meta
          name='description'
          content='Twitter for sharing events each other'
        />
      </Head>

      <Header showBackArrow label='Tweet' />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder='Tweet your reply'
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  )
}

export default PostView
