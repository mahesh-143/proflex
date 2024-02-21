import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  thumbnail: string | null | undefined;
  developerId: string | null | undefined;
  Developer: {
    user: {
      name: string | null | undefined;
    };
  };
}

export const ProjectCard = (props: Props) => {
  return (
    <Card className="md:w-fit pt-6">
      <Link href={`project/${props.id}`}>
        <CardContent className="max-w-[415px] min-w-[300px] h-[250px]">
          <Image
            src={props.thumbnail || "/demoimage.webp"}
            alt="project thumbnail"
            width={415}
            height={250}
            className="w-full h-full object-cover rounded-lg"
          />
        </CardContent>
      </Link>
      <CardFooter className="flex gap-2">
        <Link href={`project/${props.id}`}>
          <CardTitle className="text-lg">{props.title}</CardTitle>
        </Link>
        <CardDescription className="text-base">
          by{" "}
          <Link href={`/user/${props.id}`} className="text-black underline">
            {props.Developer?.user?.name}
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};
