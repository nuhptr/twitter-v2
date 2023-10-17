import axios from 'axios'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'

import useCurrentUser from './use-current-user'
import useLoginModal from './use-login-modal'
import usePost from './use-post'
import usePosts from './use-posts'

export default function useLike({ postId, userId }: { postId: string; userId?: string }) {
   const { data: currentUser } = useCurrentUser()
   const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId)
   const { mutate: mutateFetchedPosts } = usePosts(userId)

   const loginModal = useLoginModal()

   const hasLiked = useMemo(() => {
      const list = fetchedPost?.likedIds || []

      return list.includes(currentUser?.id)
   }, [fetchedPost, currentUser])

   const toggleLike = useCallback(async () => {
      if (!currentUser) return loginModal.onOpen()

      try {
         let request

         if (hasLiked) request = () => axios.delete('/api/like', { data: { postId } })
         else request = () => axios.post('/api/like', { postId })

         await request()
         mutateFetchedPost()
         mutateFetchedPosts()

         toast.success('Success')
      } catch (error) {
         toast.error('Something went wrong')
      }
   }, [currentUser, hasLiked, postId, mutateFetchedPosts, mutateFetchedPost, loginModal])

   return { hasLiked, toggleLike }
}
