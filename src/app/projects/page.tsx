import React from "react";
import Hero from "@/components/sections/hero";
import { Category } from "@prisma/client";
import { fetchProjects } from "./actions";
import { InfiniteScrollProjects } from "./InfiniteScrollProjects";
import { Filter } from "@/components/categories";

type SearchParams = {
  category?: Category;
  [key: string]: string | string[] | undefined;
};

type Props = {
  searchParams: SearchParams;
};

const Page = async ({ searchParams }: Props) => {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const projects = await fetchProjects({
    search,
    category: searchParams.category,
  });

  return (
    <div className="mx-4">
      <Hero />
      <Filter>
        <InfiniteScrollProjects search={search} initialProjects={projects} />
      </Filter>
    </div>
  );
};

export default Page;
