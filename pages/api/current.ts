import { NextApiResponse, NextApiRequest } from 'next'

import serverAuth from '@/helpers/server-auth'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
   if (request.method !== 'GET') return response.status(405).end()

   try {
      const currentUser = await serverAuth(request, response)

      return response.status(200).json(currentUser)
   } catch (error: any) {
      console.log(error)
      return response.status(400).end()
   }
}
