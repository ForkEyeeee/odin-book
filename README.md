---

# Odin Book

## Overview

Social media platform built with Next.js & PostgreSQL, featuring user authentication, friend connections and post interactions.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version)
- npm or yarn 

## Installation

1. **Clone the repository**

   Use Git to clone the project to your local machine:

   ```bash
   git clone https://github.com/ForkEyeee/odin-book
   ```

2. **Install dependencies**

   Navigate to the project directory and install the necessary dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**

   Create a `.env` file in the root of your project and fill it with the necessary environment variables:

   ```plaintext
   DATABASE_URL=""
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   GOOGLE_REFRESH_TOKEN=""
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL=""
   NEXT_PUBLIC_CLOUDINARY_CLOUDNAME=""
   NEXT_PUBLIC_CLOUDINARY_API_KEY=""
   NEXT_PUBLIC_CLOUDINARY_API_SECRET=""
   NEXT_PUBLIC_CLOUDINARY_PRESET=""
   NEXT_PUBLIC_CLOUDINARY_FOLDER=""
   CLOUDINARY_API_SECRET=""
   NEXTAUTH_SECRET=""
   NEXTAUTH_URL="http://localhost:3000"
   ```

   Replace the placeholders with your actual configuration values.

4. **Run the development server**

   Start the local development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

5. **Edit and Preview**

   You can start editing the page by modifying `app/`. The pages auto-update as you edit the files.

6. **Testing (Optional)**

   Run the tests using Cypress:

   ```bash
   npx cypress open
   # or
   yarn cypress open
   ```

## Dependencies

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Chakra UI](https://chakra-ui.com/)
- [Cypress](https://docs.cypress.io/)
- [Framer Motion](https://www.framer.com/)
- [Zod](https://github.com/colinhacks/zod/)
- [Cloudinary](https://cloudinary.com/)
- [Plaiceholder](https://plaiceholder.co/)
- [Faker](https://fakerjs.dev/guide/)

## Deploy on Vercel

Deploy your Next.js app easily using the [Vercel Platform](https://vercel.com/new). Refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---
