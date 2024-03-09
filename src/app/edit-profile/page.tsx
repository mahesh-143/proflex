import React from "react";
import { Editprofile } from "./editprofile";
import client from "../libs/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/session";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

export default async function editprofile() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }
  const userInfo = await client.user.findUnique({
    where: {
      // @ts-ignore
      id: session?.user?.id as string,
    },

    select: {
      name: true,
      email: true,
      image: true,
      bio: true,
      UserType: true,
      Developer: {
        select: {
          role: true,
          githubLink: true,
          linkedinLink: true,
        },
      },
    },
  });
  return (
    <div className="p-4 max-w-xl mx-auto">
      <Link href="..">
        <Button variant="ghost">
          <ArrowLeft />
        </Button>
      </Link>
      <Editprofile userInfo={userInfo} />
    </div>
  );
}
