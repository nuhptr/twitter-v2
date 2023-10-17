import { NextApiRequest, NextApiResponse } from 'next'

import serverAuth from '@/helpers/server-auth'
import prisma from '@/helpers/prismadb'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
   if (request.method !== 'POST') return response.status(405).end()

   try {
      const currentUser = await serverAuth(request, response)
      const { body } = request.body
      const { postId } = request.query

      if (!postId || typeof postId !== 'string') throw new Error('Invalid Post ID')

      const comment = await prisma.comment.create({ data: { body, userId: currentUser.id, postId } })

      // notification to user
      try {
         const post = await prisma.post.findUnique({ where: { id: postId } })

         if (post?.userId) {
            await prisma.notification.create({
               data: { body: 'Someone replied on your tweet!', userId: post.userId },
            })
            await prisma.user.update({ where: { id: post.userId }, data: { hasNotification: true } })
         }
      } catch (error: any) {
         console.log(error)
      }
   } catch (error: any) {
      console.error(error)
      return response.status(400).end()
   }
}
