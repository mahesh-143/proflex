# Proflex - Dribbble-Inspired Developer Platform

Proflex is a Dribbble-inspired developer platform that allows developers to share their projects and Employers to hire developers. The platform is built using Next.js, Prisma and MongoD

- [Live URL](https://proflexbymahesh.vercel.app/)
- [Github](https://github.com/mahesh-143/proflex)

## Features.

- [x] **User Authentication:** Users can sign up, log in, and manage their profiles.

- [x] **Project Submission:** Developers can submit their projects to showcase their work.

- [x] **Project Details:** Each project has its own dedicated page with detailed information and media.

- [x] **Tagging and Categorization:** Projects can be tagged and categorized for easier discovery.

- [ ] **Post Job Listing:** Employers can post job listings for developers.

- [ ] **Stripe Subscription:** Monthly subscription for employers to post job listings.

- [ ] **Search Functionality:** Search projects and developers to find specific content.

## Tech Stack

- [Next.js](https://nextjs.org/) - A Javascript framework for building web applications.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- [Shadcn UI](https://ui.shadcn.com/) - A collection of re-usable components
- [NextAuth](https://next-auth.js.org/) - An authentication solution for Next.js applications.
- [Prisma](https://www.prisma.io/) - An open source next-generation ORM.
- [Uploadthing](https://uploadthing.com/) - An easier way to upload files.
- [MongoDB](https://www.mongodb.com/) - A NoSQL (non-relational) database.

## Project Setup

To run this developer platform locally on your machine, follow these steps:

1.  **Clone the Repository:** Begin by cloning this GitHub repository to your local machine:

    ```bash
    git clone https://github.com/mahesh-143/proflex.git
    ```

2.  **Navigate to Directory:** Move into the project directory:

    ```bash
    cd proflex
    ```

3.  **Install Dependencies:** Install the necessary dependencies using npm or yarn or pnpm:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

4.  **Set Up MongoDB:**: Ensure you have a MongoDB instance running and create a database for this project

5.  **Configure Environment Variables:** Create a .env.local file in the root directory and set the necessary environment variables, including database connection details and authentication keys.

6.  **Run Migrations:** Apply the database schema and run migrations using Prisma:

    ```bash
    npx prisma db push
    ```

7.  **Run Development Server:** Start the Next.js development server:

        ```bash
        npm run dev
        # or
        yarn dev
        # or
        pnpm dev
        ```

    Open http://localhost:3000 with your browser to see the result.

## Acknowledgements

- YouTube : [Infinte Scrolling in NextJS 13 Using Server Actions by Hamed Bahram](https://www.youtube.com/watch?v=IFYFezylQlI)
