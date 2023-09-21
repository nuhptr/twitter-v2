import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/helpers/prismadb'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'GET') return response.status(405).end()

  try {
    const { userId } = request.query
    if (!userId || typeof userId !== 'string') throw new Error('Invalid ID')

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    await prisma.user.update({ where: { id: userId }, data: { hasNotification: false } })

    return response.status(200).json(notifications)
  } catch (error) {
    console.log(error)
    return response.status(400).end()
  }
}
