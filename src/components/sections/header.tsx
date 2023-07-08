"use client"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import Logo from "@/components/logo"
import { Button } from "../ui/button"
import { CreateAccount } from "../authentication/register-user"
import { Login } from "../authentication/login"
import { useSession } from "next-auth/react"

const Header = () => {
  const session = useSession()
  const name: string = session.data?.user?.name || ""
  const email: string = session.data?.user?.email || ""
  const image: string = session.data?.user?.image || ""

  const userProps = {
    name,
    email,
    image,
  }
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Logo />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            {!session.data?.user ? (
              <>
                <Login />
                <CreateAccount />
                <Button variant={"outline"}>Hire Developers</Button>
              </>
            ) : (
              <>{<UserNav {...userProps} />}</>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
