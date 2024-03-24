// "use client";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import Logo from "@/components/logo";
import { Button } from "../ui/button";
import { CreateAccount } from "../authentication/register-user";
import { Login } from "../authentication/login";
import { useSession } from "next-auth/react";
import Link from "next/link";
import MobileNav from "../mobile-nav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/session";

const Header = async () => {
  // const session = useSession();
  const session = await getServerSession(authOptions);
  //
  // const name: string = session.data?.user?.name || "";
  // const email: string = session.data?.user?.email || "";
  // const image: string = session.data?.user?.image || "";
  //
  //
  const name: string = session?.user.name || "";
  const email: string = session?.user.email || "";
  const image: string = session?.user.image || "";

  const userProps = {
    name,
    email,
    image,
  };
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex gap-4 h-16 items-center px-4">
          <Logo />
          <MainNav className="mx-6 hidden md:flex" />
          {/* <Button variant={"outline"}>Hire Developers</Button> */}
          <div className="ml-auto flex items-center space-x-4">
            {!session.data?.user ? (
              <div className="hidden md:flex gap-2 ">
                <CreateAccount />
                <Login />
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <Link
                  href={"/create-project"}
                  className="hidden md:inline-block"
                >
                  <Button variant="outline">Upload Project</Button>
                </Link>
                <UserNav {...userProps} />
              </div>
            )}
          </div>

          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
