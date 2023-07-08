import React from "react"
import prisma from "../libs/prismadb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

async function developers() {
  const users = await prisma.user.findMany()
  return (
    <div className="p-4 mx-auto md:max-w-4xl lg:max-w-5xl">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users &&
          users.map((user) => {
            return (
              <Link
                href={`user/${user.id}`}
                key={user.id}
                className="flex items-center space-x-4 p-4 border border-slate-200 rounded-xl overflow-clip"
              >
                <Avatar>
                  <AvatarImage src={user.image || "/default.webp"} />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.role} Developer</p>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default developers
