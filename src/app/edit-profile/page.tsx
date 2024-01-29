import React from "react";
import { Editprofile } from "./editprofile";
import client from "../libs/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/session";

export default async function editprofile() {
  const session = await getServerSession(authOptions);
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
      role: true,
      githubLink: true,
      linkedinLink: true,
    },
  });
  return (
    <div className="p-4 max-w-xl mx-auto">
      <Editprofile userInfo={userInfo} />
    </div>
  );
}
