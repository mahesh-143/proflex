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
        <TabsList className="inline-flex overflow-x-scroll sm:overflow-auto w-full sm:w-fit bg-transparent sm:bg-muted  pl-40 sm:pl-1">
          <TabsTrigger value="all">All</TabsTrigger>
          {categoryFilters.map((category) => {
            return (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            )
          })}
        </TabsList>
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
