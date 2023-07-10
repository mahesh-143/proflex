"use client"
import React from "react"
import { Search } from "../search"
import { useSession } from "next-auth/react"
import { Login } from "../authentication/login"
import { CreateAccount } from "../authentication/register-user"

export default function Hero() {
  const session = useSession()
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 h-auto mb-4 p-6 flex flex-col items-center gap-4 justify-center text-center">
      <h1 className="text-5xl font-bold text-white">
        Explore the best projects
      </h1>
      <p className="text-base text-white">
        Developers can showcase their project work on proflex for free
      </p>
      <Search />
      {!session?.data?.user && (
        <div className="flex gap-2">
          <CreateAccount />
          <Login />
        </div>
      )}
    </div>
  )
}
