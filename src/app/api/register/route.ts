import bcrypt from "bcrypt"
import prisma from "../../libs/prismadb"
import { NextResponse } from "next/server"
import type { NextApiRequest } from "next"

export async function POST(request: NextApiRequest) {
  const body = await request.body()
  const { name, email, password } = body

  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 })
  }

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (exist) {
    throw new Error("Email already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
