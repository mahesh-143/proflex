import { ProjectCard } from "@/components/project-card"
import client from "./libs/prismadb"
import Hero from "@/components/sections/hero"
import { Filter } from "@/components/categories"
import { Category } from "@prisma/client"

type SearchParams = {
    category?: Category
}

type Props = {
    searchParams: SearchParams
}

export default async function Home({ searchParams: { category } }: Props) {
    const projects = await client.project.findMany({
        where: {
            category: {
                equals: category,
            },
        },
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
            <Filter>
                <div className="flex flex-wrap gap-4 justify-center mb-8">
                    {projects &&
                        projects.map((project) => {
                            return <ProjectCard key={project.id} {...project} />
                        })}
                </div>
            </Filter>
        </div>
    )
}
