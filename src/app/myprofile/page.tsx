import React from "react";
import prisma from "../libs/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, LinkedinIcon } from "lucide-react";
import { Icons } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";

const getUserProfile = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    const userProfile = prisma.user.findUnique({
      //@ts-ignore
      where: { id: session.user?.id as string },
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
            projects: {
              select: {
                id: true,
                developerId: true,
                title: true,
                description: true,
                thumbnail: true,
                Developer: {
                  select: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        Employer: {
          select: {
            comapny_name: true,
            company_website: true,
            jobs: {
              select: {
                id: true,
                title: true,
                category: true,
              },
            },
          },
        },
      },
    });
    return userProfile;
  }
};

export default async function MyProfile() {
  const user = await getUserProfile();
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
              <AvatarFallback className="text-7xl">
                {user.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h1 className="font-bold text-3xl">{user.name}</h1>
              {user?.UserType == "Developer" &&
                (user.Developer?.role ? (
                  <p className="text-muted-foreground">
                    {user.Developer?.role} Developer
                  </p>
                ) : (
                  <Link
                    href="edit-profile"
                    className="underline text-muted-foreground"
                  >
                    Click here to add role
                  </Link>
                ))}
            </div>
            <p className="max-w-md text-center">{user.bio}</p>

            {user.UserType == "Developer" && (
              <div className="flex gap-4">
                {user.Developer?.githubLink ? (
                  <Link href={user.Developer?.githubLink || "#"}>
                    <Button size="icon">
                      <Icons.gitHub className="p-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="edit-profile">
                    <Button>Add Github</Button>
                  </Link>
                )}
                {user.Developer?.linkedinLink ? (
                  <Link href={user.Developer?.linkedinLink || "#"}>
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
            )}
          </div>
        </>
      )}
      <div>
        {user?.UserType == "Developer"
          ? user?.Developer?.projects &&
            user.Developer.projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))
          : user?.Employer?.jobs.map((job) => (
              <div key={job.id}>{JSON.stringify(job)}</div>
            ))}
      </div>
    </div>
  );
}
