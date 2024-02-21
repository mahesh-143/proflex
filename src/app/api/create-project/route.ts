import { getServerSession } from "next-auth/next";
import prisma from "../../libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  // Check if the user is authenticated
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const developer = await prisma.developer.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
    },
  });
  try {
    const project = await prisma.project.create({
      data: {
        developerId: developer?.id,
        ...body,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.log("server error: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
