"use client"
import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { NavLinks } from "@/constant"
import { Login } from "./authentication/login"
import { CreateAccount } from "./authentication/register-user"
import { UserNav } from "./user-nav"
import { useSession } from "next-auth/react"

export default function MobileNav() {
  const session = useSession()

  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-3">
          {NavLinks.map((navlink) => {
            return (
              <Link
                key={navlink.key}
                href={navlink.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                <DropdownMenuItem>{navlink.text}</DropdownMenuItem>
              </Link>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
