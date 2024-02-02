import React from "react";
import EditProjectForm from "./editProject";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/session";
import prisma from "@/app/libs/prismadb";
import client from "@/app/libs/prismadb";

async function EditProject({ params }: { params: { id: string } }) {
  if (!(params.id.length === 24)) {
    return <h1>project not found</h1>;
  }

  const getProject = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
      const userProfile = prisma.user.findUnique({
        where: { email: session.user?.email as string },
      });
      return userProfile;
    }
  };

  const projectInfo = await client.project.findUnique({
    where: { id: params.id },
    select: {
      title: true,
      category: true,
      liveLink: true,
      githubLink: true,
      thumbnail: true,
      description: true,
    },
  });

  return (
    <div className="p-4 max-w-xl mx-auto">
      <EditProjectForm id={params.id} projectInfo={projectInfo} />
    </div>
  );
}

export default EditProject;
