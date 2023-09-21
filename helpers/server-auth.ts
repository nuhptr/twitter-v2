import { NextApiRequest, NextApiResponse } from 'next'

import { options } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

import prisma from '@/helpers/prismadb'

export default async function serverAuth(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession(request, response, options)
  if (!session?.user?.email) throw new Error('Not Logged In')

  const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!currentUser) throw new Error('Not Logged In')

  return currentUser
}
