import { NextApiRequest, NextApiResponse } from 'next'

import serverAuth from '@/helpers/server-auth'
import prisma from '@/helpers/prismadb'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST' && request.method !== 'DELETE') return response.status(405).end()

  try {
    const currentUser = await serverAuth(request, response)
    const { postId } = request.body
    if (!postId || typeof postId !== 'string') throw new Error('Invalid Post ID')

    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post) throw new Error('Post Not Found')

    let updatedLikeIds = [...(post.likedIds || [])]

    if (request.method === 'POST') {
      updatedLikeIds.push(currentUser.id)

      // TODO: Send notification to post author
      try {
        const post = await prisma.post.findUnique({ where: { id: postId } })

        if (post?.userId) {
          await prisma.notification.create({
            data: { body: 'Someone liked your post!', userId: post.userId },
          })

          await prisma.user.update({ where: { id: post.userId }, data: { hasNotification: true } })
        }
      } catch (error: any) {
        console.error(error)
      }
    }

    if (request.method === 'DELETE') {
      updatedLikeIds = updatedLikeIds.filter((likeId) => likeId !== currentUser.id)
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likedIds: updatedLikeIds },
    })

    return response.status(200).json(updatedPost)
  } catch (error: any) {
    console.log(error)
    return response.status(400).end()
  }
}
