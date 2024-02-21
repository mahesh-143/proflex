import client from "./prismadb";
import { Category } from "@prisma/client";

export const getProjects = async ({
  query,
  category,
  page = 1,
  limit = 20,
}: {
  query?: string;
  category?: Category;
  page?: number;
  limit?: number;
}) => {
  try {
    const projects = await client.project.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        category: {
          equals: category,
        },
      },
      include: {
        Developer: {
          select: {
            user: true,
          },
        },
      },
    });
    return { projects: projects };
  } catch (error) {
    return { error };
  }
};
