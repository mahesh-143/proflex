"use server";

import { Category } from "@prisma/client";
import { getProjects } from "../libs/projects";

export async function fetchProjects({
  page = 1,
  search,
  category,
}: {
  page?: number;
  search?: string | undefined;
  category?: Category;
}) {
  const { projects } = await getProjects({ query: search, page, category });
  return projects;
}
