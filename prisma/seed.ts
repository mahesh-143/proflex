import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  //   const project1 = await prisma.project.upsert({
  //     data: {
  //       developerId: "64a1a55cab55785c885dcd01",
  //       title: "project1",
  //       description: "some description",
  //     },
  //   });
  // }

  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      projects: {
        create: [
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
          {
            title: "Check out Prisma with Next.js",
            description: "https://www.prisma.io/nextjs",
            category: "Mobile",
          },
        ],
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
