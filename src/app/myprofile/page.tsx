import React from "react"
import prisma from "../libs/prismadb"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/session"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowLeft,
  LinkedinIcon,
} from "lucide-react"
import { Icons } from "@/components/icons"

const getUserProfile = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    const userProfile = prisma.user.findUnique({
        //@ts-ignore
      where: { id: session.user?.id as string },
    })
    return userProfile
  }
}

export default async function MyProfile() {
  const user = await getUserProfile()
  return (
    <div>
      {!user ? (
        <h1>You havent signed in</h1>
      ) : (
        <>
          <div className="flex flex-col items-center gap-5 container mx-auto pt-10">
            <div className="flex justify-between w-full max-w-lg">
              <Link href="..">
              <Button variant="ghost">
                <ArrowLeft />
              </Button>
              </Link>

              <Link href="edit-profile">
                <Button variant="outline">Edit Profile</Button>
              </Link>
            </div>
            <Avatar className="w-40 h-40">
              <AvatarImage
                src={user.image || "default.png"}
                alt={user.name || "User Profile Picture"}
              />
              <AvatarFallback className="text-7xl">{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h1 className="font-bold text-3xl">{user.name}</h1>
              {user.role ? (
                <p className="text-muted-foreground">{user.role} Developer</p>
              ) : (
                <Link
                  href="edit-profile"
                  className="underline text-muted-foreground"
                >
                  Click here to add role
                </Link>
              )}
            </div>
            <p className="max-w-md text-center">
              {user.bio || "Hey I am new here and didnt add bio yet"}
            </p>
            <div className="flex gap-4">
              {user.githubLink ? (
                <Link href={user.githubLink || "#"}>
                  <Button size="icon">
                    <Icons.gitHub className="p-2" />
                  </Button>
                </Link>
              ) : (
                <Link href="edit-profile">
                  <Button>Add Github</Button>
                </Link>
              )}
              {user.linkedinLink ? (
                <Link href={user.linkedinLink || "#"}>
                  <Button size="icon">
                    <LinkedinIcon />
                  </Button>
                </Link>
              ) : (
                <Link href="edit-profile">
                  <Button>Add Linkedin</Button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
