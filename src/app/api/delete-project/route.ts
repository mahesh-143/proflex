import { getServerSession } from "next-auth/next"
import client from "../../libs/prismadb"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/lib/session"

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  // Check if the user is authenticated
  //@ts-ignore
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  try {
    // delete the project in database
    const deleteProject = await client.project.delete({
      where: {
        id: body.id,
      },
    })
    return NextResponse.json(deleteProject, { status: 200 })
  } catch (error) {
    console.log(error)
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
