import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

import Header from '@/components/general/header'
import NotificationsFeed from '@/components/general/notifications-feed'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) return { redirect: { destination: '/', permanent: false } }
  return { props: { session } }
}

export default function Notifications() {
  return (
    <>
      <Header showBackArrow label='Notifications' />
      <NotificationsFeed />
    </>
  )
}
