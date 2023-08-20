import axiosClient from "./axiosClient"

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
  image? : string
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
  id?: string
  thumbnail? : string
  title?: string
  description?: string
  category?: string
  githubLink?: string
  liveLink?: string
  developerId?: string
}) {
  return axiosClient.put("/api/edit-project", data)
}

export async function deleteProject(id: string) {
  return axiosClient.delete("/api/delete-project", { data: { id: id } })
}
