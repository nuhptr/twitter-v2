# TWITTER clone with NEXT13 , Tailwind, Next, Prisma, Mongo, NextAuth & Vercel

![Fullstack Twitter](https://github.com/nuhptr/twitter-clone-v2/assets/50306963/81ee094f-3998-4b19-b82e-af2d64e2ca9a)

This is a repository for a FullStack Twitter clone using NextJS, TailwindCSS & Prisma.

There are many funcionalities such as:

-  Authentication system
-  Notification system
-  Image Upload using Base64 strings
-  Prisma ORM with MongoDB
-  Responsive Layout
-  1 To Many Relations (User - Post)
-  Many To Many Relations (Post - Comment)
-  Following functionality
-  Comments / Replies
-  Likes functionality
-  Vercel Deployment

### Prerequisites

**Node version 14.x**

### Dependencies

```shell
git clone https://github.com/AntonioErdeljac/twitter-clone.git
```

### Install packages

```shell
# tailwindcss, postcss, autoprefixer
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

# bcrypt (password hashing)
npm install bcrypt && npm install @types/bcrypt

# next-auth (authentication)
npm install next-auth && npm install @next-auth/prisma-adapter

# prisma (ORM)
npm install prisma && npm install @prisma/client

# react-icons (icons)
npm install react-icons

# react dropzone (image upload)
npm install react-dropzone

# react hot toast (notifications)
npm install react-hot-toast

# react spinners (loading)
npm install react-spinners

# react toastify (notifications)
npm install react-toastify

# swr (stale while revalidate)
npm install swr

# zustand (state management)
npm install zustand

# date-fns (date formatting)
npm install date-fns

# axios (http requests)
npm install axios
```

### Setup .env file

```js
DATABASE_URL=
NEXTAUTH_JWT_SECRET=
NEXTAUTH_SECRET=
```
