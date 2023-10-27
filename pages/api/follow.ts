import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/helpers/server-auth"
import prisma from "@/helpers/prismadb"

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
   if (request.method !== "POST" && request.method !== "DELETE") return response.status(405).end()

   try {
      const currentUser = await serverAuth(request, response)
      const { userId } = request.body
      if (!userId || typeof userId !== "string") throw new Error("Invalid User ID")

      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user) throw new Error("User Not Found")

      let updatedFollowingIds = [...(user.followingIds || [])]

      if (request.method === "POST") {
         updatedFollowingIds.push(currentUser.id)

         // notification to user
         try {
            await prisma.notification.create({ data: { body: "Someone followed you!", userId } })
            await prisma.user.update({ where: { id: userId }, data: { hasNotification: true } })
         } catch (error: any) {
            console.error(error)
         }
         // end notification
      }

      if (request.method === "DELETE") {
         updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId)
      }

      const updatedUser = await prisma.user.update({
         where: { id: currentUser.id },
         data: { followingIds: updatedFollowingIds },
      })

      return response.status(200).json(updatedUser)
   } catch (error: any) {
      console.error(error)
      return response.status(400).end()
   }
}
