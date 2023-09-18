import PostFeed from '@/components/posts/post-feed'
import Header from '@/components/header'
import Form from '@/components/form'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Twitter</title>
        <meta name='description' content='Twitter for sharing events each other' />
      </Head>

      <Header label='Home' />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}
