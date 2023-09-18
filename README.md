# TWITTER clone with NEXT13 , Tailwind, Next, Prisma, Mongo, NextAuth & Vercel

![Fullstack Twitter](https://github.com/nuhptr/twitter-clone-v2/assets/50306963/81ee094f-3998-4b19-b82e-af2d64e2ca9a)

This is a repository for a FullStack Twitter clone using NextJS, TailwindCSS & Prisma.

There are many funcionalities such as:

- Authentication system
- Notification system
- Image Upload using Base64 strings
- Prisma ORM with MongoDB
- Responsive Layout
- 1 To Many Relations (User - Post)
- Many To Many Relations (Post - Comment)
- Following functionality
- Comments / Replies
- Likes functionality
- Vercel Deployment

### Prerequisites

**Node version 14.x**

### Dependencies

[tailwindcss](https://tailwindcss.com/) - npm install -D tailwindcss@latest postcss@latest autoprefixer@latest, `for styling`
[bcrypt](https://www.npmjs.com/package/bcrypt) - npm install bcrypt && npm install @types/bcrypt, `for hashing passwords`
[next-auth](https://next-auth.js.org/) - npm install next-auth && npm install @next-auth/prisma-adapter, `for authentication`
[prisma](https://www.prisma.io/) - npm install prisma && npm install @prisma/client, `for ORM`
[mongodb](https://www.mongodb.com/) - npm install mongodb, `for database`
[react-icons](https://react-icons.github.io/react-icons/) - npm install react-icons, `for icons`
[react-dropzone](https://react-dropzone.js.org/) - npm install react-dropzone, `for image upload`
[react-hot-toast](https://react-hot-toast.com/) - npm install react-hot-toast, `for notifications`
[react-spinners](https://www.npmjs.com/package/react-spinners) - npm install react-spinners, `for loading`
[react-toastify](https://fkhadra.github.io/react-toastify/introduction/) - npm install react-toastify, `for notifications`
[swr](https://swr.vercel.app/) - npm install swr, `for stale while revalidate`
[zustand](https://zustand-demo.pmnd.rs/) - npm install zustand, `for state management`
[date-fns](https://date-fns.org/) - npm install date-fns, `for date formatting`
[axios](https://axios-http.com/) - npm install axios, `for http requests`

### Setup .env file

```bash
DATABASE_URL=
NEXTAUTH_JWT_SECRET=
NEXTAUTH_SECRET=
```
