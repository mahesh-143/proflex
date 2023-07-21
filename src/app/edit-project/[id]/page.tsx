import React from 'react'
import EditProjectForm from './editProject'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/session'
import prisma from '@/app/libs/prismadb'
function EditProject(params: { params: { id: string } }) {
    if (!(params.params.id.length === 24)) {
    return <h1>project not found</h1>
  }
const getProject = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    const userProfile = prisma.user.findUnique({
      where: { email: session.user?.email as string },
    })
    return userProfile
  }
}


  return (
    <div className="p-4 max-w-xl mx-auto">
      <EditProjectForm />
    </div>
  )
}

export default EditProject