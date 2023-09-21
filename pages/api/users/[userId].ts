import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/helpers/prismadb'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'GET') return response.status(405).end()

  try {
    const { userId } = request.query
    if (!userId || typeof userId !== 'string') throw new Error('Invalid User ID')

    const existingUser = await prisma.user.findUnique({ where: { id: userId } })

    const followersCount = await prisma.user.count({ where: { followingIds: { has: userId } } })

    return response.status(200).json({ ...existingUser, followersCount })
  } catch (error) {
    console.log(error)
    return response.status(400).end()
  }
}
