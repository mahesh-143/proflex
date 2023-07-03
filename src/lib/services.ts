import axiosClient from "./axiosClient"

export async function createUser(data: {
  name: string
  email: string
  password: string
}) {
  return axiosClient.post("api/register", data)
}

