import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/helpers/server-auth"
import prisma from "@/helpers/prismadb"

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
   if (request.method !== "POST" && request.method !== "GET") return response.status(405).end()

   try {
      if (request.method === "POST") {
         const currentUser = await serverAuth(request, response)
         const { body } = request.body

         const post = await prisma.post.create({ data: { body, userId: currentUser.id } })

         return response.status(200).json(post)
      }

      if (request.method === "GET") {
         const { userId } = request.query

         let posts

         if (userId && typeof userId === "string") {
            posts = await prisma.post.findMany({
               where: { userId },
               include: { user: true, comments: true },
               orderBy: { createdAt: "desc" },
            })
         } else {
            posts = await prisma.post.findMany({
               include: { user: true, comments: true },
               orderBy: { createdAt: "desc" },
            })
         }

         return response.status(200).json(posts)
      }
   } catch (error) {
      console.log(error)
      return response.status(400).end()
   }
}
