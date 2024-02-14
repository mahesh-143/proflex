import React from "react";
import { fetchJobs } from "./actions";
import { Category } from "@prisma/client";
import { InfiniteScrollJobs } from "./InfinteScrollJobs";
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

  const jobs = await fetchJobs({
    search,
    category: searchParams.category,
  });

  return (
    <div className="mx-4">
      <Filter>
        <InfiniteScrollJobs
          category={searchParams.category}
          search={search}
          initialJobs={jobs}
        />
      </Filter>
    </div>
  );
};

export default Page;
