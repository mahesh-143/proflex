import client from "@/app/libs/prismadb";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  // Check if the user is authenticated
  //@ts-ignore
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  //@ts-ignore
  const id = await session?.user?.id;

  try {
    const newEmail = await body.email;
    if (!(newEmail === session?.user?.email)) {
      const exist = await client.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (exist) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 },
        );
      }
    } else {
      const updatedUser = await client.user.update({
        where: { id },
        // data: { ...body },
        data: {
          name: body.name,
          email: body.email,
          bio: body.bio,
          UserType: body.UserType,
          Developer: {
            create: {
              role: body.role,
            },
          },
        },
      });
      return NextResponse.json(updatedUser, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
