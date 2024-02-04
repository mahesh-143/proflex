# Proflex - Dribbble-Inspired Developer Platform

This repository contains the code for a Dribbble-inspired developer platform that allows developers to share their projects. The platform is built using Next.js, Prisma and MongoDB.

## [Live URL](https://proflexbymahesh.vercel.app)

## Features.

- [x]**User Authentication:** Users can sign up, log in, and manage their profiles.

- [x]**Project Submission:** Developers can submit their projects to showcase their work.

- [x]**Project Details:** Each project has its own dedicated page with detailed information and media.

- [x]**Tagging and Categorization:** Projects can be tagged and categorized for easier discovery.

- [ ]**Search Functionality:** Search projects and developers to find specific content.

## Tech Stack

- [Next.js](https://nextjs.org/) - A Javascript framework for building web applications.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- [NextAuth](https://next-auth.js.org/) - An authentication solution for Next.js applications.
- [Prisma](https://www.prisma.io/) - An open source next-generation ORM.
- [MongoDB](https://www.mongodb.com/) - A NoSQL (non-relational) database.

## Project Setup

To run this developer platform locally on your machine, follow these steps:

1. **Clone the Repository:** Begin by cloning this GitHub repository to your local machine:

   ```bash
   git clone https://github.com/mahesh-143/proflex.git
    ```
2. **Navigate to Directory:** Move into the project directory:

    ```bash
    cd proflex
    ```
3. **Install Dependencies:** Install the necessary dependencies using npm or yarn or pnpm:

    ```bash
    npm install
    # or
    yarn install
    # or 
    pnpm install
    ```
4. **Set Up MongoDB:**: Ensure you have a MongoDB instance running and create a database for this project

5. **Configure Environment Variables:** Create a .env.local file in the root directory and set the necessary environment variables, including database connection details and authentication keys.

6. **Run Migrations:** Apply the database schema and run migrations using Prisma:

    ```bash
    npx prisma db push
    ```
7. **Run Development Server:** Start the Next.js development server:

    ```bash
    npm run dev
    # or 
    yarn dev
    # or
    pnpm dev
    ```
Open http://localhost:3000 with your browser to see the result.
