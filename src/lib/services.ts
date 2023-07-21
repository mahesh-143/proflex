import { useSession } from "next-auth/react"
import axiosClient from "./axiosClient"
import prisma from "@/app/libs/prismadb"

export async function createUser(data: {
  name: string
  email: string
  password: string
}) {
  return axiosClient.post("api/register", data)
}

export async function updateUser(data: {
  name?: string
  email?: string
  bio?: string
  github?: string
  linkedin?: string
  role?: string
}) {
  return axiosClient.put("api/edit-user", data)
}

export async function createProject(data: {
  title?: string
  description?: string
  category?: string
  githubLink?: string
  liveLink?: string
  developerId?: string
}) {
  return axiosClient.post("api/create-project", data)
}

export async function editProject(data: {
  title?: string
  description?: string
  category?: string
  githubLink?: string
  liveLink?: string
  developerId?: string
}) {
  return axiosClient.put("api/edit-project", data)
}
