import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  id: string | null | undefined
  title : string | null | undefined
  description: string | null | undefined
  thumbnail: string | null | undefined
  developer: {
    name: string | null
  } | null
  developerId: string | null | undefined
}
export const ProjectCard = (props : Props) => {
  return (
    <Card>
      <CardHeader>
        <Link href={`project/${props.id}`}>
        <CardTitle className='text-base'>{props.title}</CardTitle>
        </Link>
        <CardDescription className='text-sm'>
          by  <Link href={`/user/${props.developerId}`} className='text-black underline'>{props.developer?.name}</Link>
        </CardDescription>
      </CardHeader>
      <Link href={`project/${props.id}`}>
      <CardContent>
        <Image
          src={"/demoimage.jpg"}
          alt="project thumbnail"
          width={200}
          height={100}
          className="w-full"
        />
      </CardContent>
       </Link>
    </Card>
  )
}
