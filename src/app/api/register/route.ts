import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password, UserType } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Empty Fields" }, { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      UserType,
      Developer: {
        create: {},
      },
    },
  });
  return NextResponse.json(user);
}
