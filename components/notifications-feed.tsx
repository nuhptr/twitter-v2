import { useEffect } from "react"
import { BsTwitter } from "react-icons/bs"

import useNotifications from "@/hooks/use-notifications"
import useCurrentUser from "@/hooks/use-current-user"

export default function NotificationsFeed() {
   const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
   const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id)

   useEffect(() => {
      mutateCurrentUser()
   }, [mutateCurrentUser])

   if (fetchedNotifications.length === 0) {
      return <div className="p-6 text-xl text-center text-neutral-600">No notifications</div>
   }

   return (
      <div className="flex flex-col">
         {fetchedNotifications.map((notification: Record<string, any>) => (
            <div
               key={notification.id}
               className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
               <BsTwitter color="white" size={32} />
               <p className="text-white">{notification.body}</p>
            </div>
         ))}
      </div>
   )
}
