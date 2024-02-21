import React from "react";
import client from "@/app/libs/prismadb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { LinkedinIcon } from "lucide-react";

export default async function User(params: { params: { id: string } }) {
  if (!(params.params.id.length === 24)) {
    return <h1>user not found</h1>;
  }
  const user = await client.user.findUnique({
    where: {
      id: params.params.id,
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
      Employer: {
        select: {
          comapny_name: true,
          company_website: true,
        },
      },
    },
  });
  if (user) {
    return (
      <div>
        <div className="flex flex-col items-center gap-5 container mx-auto pt-10">
          <Avatar className="w-40 h-40">
            <AvatarImage
              src={user.image || "default.png"}
              alt={user.name || "User Profile Picture"}
            />
            <AvatarFallback className="text-7xl">
              {user.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 className="font-bold text-3xl">{user.name}</h1>
            {user.Developer?.role && (
              <p className="text-muted-foreground">
                {user.Developer?.role} Developer
              </p>
            )}
          </div>
          <p className="max-w-md text-center">
            {user.bio || "Hey I am new here and didnt add bio yet"}
          </p>
          {user.UserType == "Developer" && (
            <div className="flex gap-4">
              {user.Developer?.githubLink && (
                <Link href={user.Developer?.githubLink || "#"}>
                  <Button size="icon">
                    <Icons.gitHub className="p-2" />
                  </Button>
                </Link>
              )}
              {user.Developer?.linkedinLink && (
                <Link href={user.Developer?.linkedinLink || "#"}>
                  <Button size="icon">
                    <LinkedinIcon />
                  </Button>
                </Link>
              )}
            </div>
          )}
          {
            user.UserType == "Employer" && (

            )
          }
        </div>
      </div>
    );
  } else {
    return <h1>user not found</h1>;
  }
}
