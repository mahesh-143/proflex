import Hero from "@/components/sections/hero";
import { Category } from "@prisma/client";
import { fetchProjects } from "./projects/actions";
import { Filter } from "@/components/categories";
import { InfiniteScrollProjects } from "./projects/InfiniteScrollProjects";
import { PagesRouteModuleOptions } from "next/dist/server/future/route-modules/pages/module.compiled";

type SearchParams = {
  category?: Category;
  [key: string]: string | string[] | undefined;
};

type Props = {
  searchParams: SearchParams;
};

export default async function Home({ searchParams }: Props) {
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
}
