import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { categoryFilters } from "@/constant"
import { ProjectCard } from "@/components/project-card"
import client from "./libs/prismadb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

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
    <div className="mx-4 mt-8">
      <Tabs defaultValue="all" className="sm:space-y-8 sm:grid sm:place-items-center">
        <TabsList className="hidden sm:block">
          <TabsTrigger value="all">All</TabsTrigger>
          {categoryFilters.map((category) => {
            return (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            )
          })}
        </TabsList>
        <div className="sm:hidden w-fit mx-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"secondary"}>
            Filter
            </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent>
            <TabsList className="flex-col h-auto">
           {categoryFilters.map((category) => {
            return (
              <DropdownMenuItem>
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
              </DropdownMenuItem>
            )
          })}
          </TabsList>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>

        <TabsContent value="all" className="sm:first-letter:space-y-8">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {projects &&
              projects.map((project) => {
                return <ProjectCard {...project} />
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
