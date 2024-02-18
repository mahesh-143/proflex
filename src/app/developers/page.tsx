import React from "react";
import prisma from "../libs/prismadb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

async function developers() {
  const developer = await prisma.user.findMany({
    where: {
      UserType: "Developer",
    },
    include: {
      Developer: {
        select: {
          role: true,
        },
      },
    },
  });

  return (
    <div className="p-4 mx-auto md:max-w-4xl lg:max-w-5xl">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {developer &&
          developer.map((developer) => {
            return (
              <Link
                href={`user/${developer.id}`}
                key={developer.id}
                className="flex items-center space-x-4 p-4 border border-slate-200 rounded-xl overflow-clip"
              >
                <Avatar>
                  <AvatarImage src={developer.image || "/default.webp"} />
                  <AvatarFallback>{developer.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {developer.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {developer.Developer?.role} Developer
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default developers;
