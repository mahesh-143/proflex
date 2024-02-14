import client from "./prismadb";
import { Category } from "@prisma/client";

export const getJobs = async ({
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
    const jobs = await client.job.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        category: {
          equals: category,
        },
      },
    });
    return { jobs: jobs };
  } catch (error) {
    return { error };
  }
};
