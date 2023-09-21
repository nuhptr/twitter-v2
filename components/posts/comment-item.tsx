import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

import Avatar from '../avatar'

export default function CommentItem({ data = {} }: { data: Record<string, any> }) {
  const router = useRouter()

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation()
      router.push(`/users/${data.user.id}`)
    },
    [router, data.user.id]
  )

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null

    return formatDistanceToNowStrict(new Date(data.createdAt))
  }, [data.createdAt])

  return (
    <div
      className='
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      '>
      <div className='flex flex-row items-start gap-3'>
        <Avatar userId={data.user.id} />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p
              onClick={goToUser}
              className='font-semibold text-white cursor-pointer hover:underline'>
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className='hidden cursor-pointer text-neutral-500 hover:underline md:block'>
              @{data.user.username}
            </span>
            <span className='text-sm text-neutral-500'>{createdAt}</span>
          </div>
          <div className='mt-1 text-white'>{data.body}</div>
        </div>
      </div>
    </div>
  )
}
