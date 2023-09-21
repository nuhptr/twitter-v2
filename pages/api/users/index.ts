import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/helpers/prismadb'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'GET') return response.status(405).end()

  try {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })

    return response.status(200).json(users)
  } catch (error) {
    console.log(error)
    return response.status(400).end()
  }
}
