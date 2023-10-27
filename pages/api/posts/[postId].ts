import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/helpers/prismadb"

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
   if (request.method !== "GET") return response.status(405).end()

   try {
      const { postId } = request.query
      if (!postId || typeof postId !== "string") throw new Error("Invalid ID")

      const post = await prisma.post.findUnique({
         where: { id: postId },
         include: { user: true, comments: { include: { user: true }, orderBy: { createdAt: "desc" } } },
      })

      return response.status(200).json(post)
   } catch (error) {
      console.log(error)
      return response.status(400).end()
   }
}
