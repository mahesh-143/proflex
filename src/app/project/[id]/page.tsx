import React from "react"
import client from "@/app/libs/prismadb"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { LinkedinIcon } from "lucide-react"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"

export default async function User(params: { params: { id: string } }) {
  if (!(params.params.id.length === 24)) {
    return <h1>project not found</h1>
  }
  const project = await client.project.findUnique({
    where: {
      id: params.params.id,
    },
    include: {
      developer : {
        select : {
          name : true
        }
      }
    }
  })
  if (project) {
    return (
      <div className="max-w-lg mx-auto flex flex-col gap-4 p-4">
        <AspectRatio ratio={16 / 9}>
          <Image
            src="/demoimage.jpg"
            alt="project name"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
        <div className="flex gap-2 items-start">
          <h1 className="font-bold text-4xl">{project.title}</h1>
          <Badge variant={"secondary"}>
            {project.category}
          </Badge>
        </div>
        <p className="text-sm">by <Link href={project.developerId || "#"} className="underline text-muted-foreground">{project.developer?.name}</Link></p>
        <p>{project.description}</p>
        <div className="flex gap-4">
          {project.githubLink && (
            <Link href={project.githubLink}>
              <Button variant="outline">Github</Button>
            </Link>
          )}
          {project.liveLink && (
            <Link href={project.liveLink}>
              <Button variant="outline">Live</Button>
            </Link>
          )}
        </div>
      </div>
    )
  } else {
    return <h1>project not found</h1>
  }
}
