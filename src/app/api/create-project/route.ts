import { getServerSession } from "next-auth/next"
import prisma from "../../libs/prismadb"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/lib/session"

export async function POST(req: NextRequest) {
 const session = await getServerSession(authOptions)
  // Check if the user is authenticated
  //@ts-ignore
  if (!session?.user?.id) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await req.json()
  //@ts-ignore
  const developerId = session.user.id
  const developer = await prisma.user.findUnique({
    where: {
      //@ts-ignore
      id: session.user.id
    }
  })
  try {
    const project = await prisma.project.create({
      data: {
        developerId: developerId,
       ...body
      },
    })
    return NextResponse.json(project)
  } catch (error) {
    console.log("server error: ", error)
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
  }
  
}
