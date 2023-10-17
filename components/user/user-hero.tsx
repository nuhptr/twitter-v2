import Image from 'next/image'

import Avatar from '../avatar'
import useUser from '@/hooks/use-user'

export default function UserHero({ userId }: { userId: string }) {
   const { data: fetchedUser } = useUser(userId)

   return (
      <div>
         <div className='relative bg-neutral-700 h-44'>
            {fetchedUser?.coverImage && (
               <Image src={fetchedUser.coverImage} fill alt='Cover Image' style={{ objectFit: 'cover' }} />
            )}
            <div className='absolute -bottom-16 left-4'>
               <Avatar userId={userId} isLarge hasBorder />
            </div>
         </div>
      </div>
   )
}
