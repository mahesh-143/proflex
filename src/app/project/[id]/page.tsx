import React from "react"
import client from "@/app/libs/prismadb"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { LinkedinIcon } from "lucide-react"

export default async function User(params: { params: { id: string } }) {
    if(!(params.params.id.length === 24)){
        return <h1>project not found</h1>
    }
     const project = await client.project.findUnique({
      where: {
        id: params.params.id,
      },
    })
  if (project) {
    return (
      <div>
        <pre>
            {JSON.stringify(project)}
        </pre>
     </div>
    )
  } else {
    return <h1>project not found</h1>
  }
}
