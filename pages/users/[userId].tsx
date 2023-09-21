import { useRouter } from 'next/router'
import { ClipLoader } from 'react-spinners'
import Head from 'next/head'

import useUser from '@/hooks/use-user'

import PostFeed from '@/components/posts/post-feed'
import Header from '@/components/header'
import UserBio from '@/components/user/user-bio'
import UserHero from '@/components/user/user-hero'

export default function UserView() {
  const router = useRouter()
  const { userId } = router.query

  const { data: fetchedUser, isLoading } = useUser(userId as string)

  if (isLoading || !fetchedUser) {
    return (
      <div className='flex items-center justify-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Twitter | {fetchedUser?.name}</title>
        <meta name='description' content='Twitter for sharing events each other' />
      </Head>

      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  )
}
