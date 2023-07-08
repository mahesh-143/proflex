import client from "@/app/libs/prismadb"
import { authOptions } from "@/lib/session"
import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  // Check if the user is authenticated
  //@ts-ignore
  if (!session?.user?.id) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  //@ts-ignore
  const id = await session?.user?.id
  try {
    // update the user in database
    const updatedUser = await client.user.update({
        where: {id},
        data: {...body}
    })
    return NextResponse.json(updatedUser, {status: 200})
  }
  catch (error) {
    console.log(error)
    NextResponse.json({error: "Internal Server Error"}, {status: 500})
  }
}
