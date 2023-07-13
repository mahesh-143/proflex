import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { categoryFilters } from "@/constant"
import { ProjectCard } from "@/components/project-card"
import client from "./libs/prismadb"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Hero from "@/components/sections/hero"

export default async function Home() {
  const projects = await client.project.findMany({
    include: {
      developer: {
        select: {
          name: true,
        },
      },
    },
  })
  return (
    <div className="mx-4">
      <Hero />
      <Tabs
        defaultValue="all"
        className="sm:space-y-8 flex flex-col items-center"
      >
        <TabsList className="hidden sm:inline-flex">
          <TabsTrigger value="all">All</TabsTrigger>
          {categoryFilters.map((category) => {
            return (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            )
          })}
        </TabsList>
        <div className="sm:hidden my-2 w-fit self-start">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {categoryFilters.map((category) => {
                  return <SelectItem value="category" key={category}>{category}</SelectItem>
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="all" className="sm:space-y-8">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {projects &&
              projects.map((project) => {
                return <ProjectCard key={project.id} {...project} />
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
