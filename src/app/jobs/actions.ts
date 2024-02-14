"use server";

import { Category } from "@prisma/client";
import { getJobs } from "../libs/jobs";

export async function fetchJobs({
  page = 1,
  search,
  category,
}: {
  page?: number;
  search?: string | undefined;
  category?: Category;
}) {
  const { jobs, error } = await getJobs({
    query: search,
    page,
    category,
  });
  if (error) {
    console.log(error);
    return [];
  }
  return jobs || [];
}
