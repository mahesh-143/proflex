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
    const {id, ...body} = await request.json()
    try {
        // update the project in database
        const editProject = await client.project.update({
            where: {
                id : id
            },
            data: {...body}
        })
        return NextResponse.json(editProject, {status: 200})
    }
    catch (error) {
        console.log(error)
        NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}
