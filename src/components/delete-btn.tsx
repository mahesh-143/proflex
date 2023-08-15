"use client"
import React from "react"
import { Button } from "./ui/button"
import { Icons } from "./icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { useToast } from "./ui/use-toast"
import { useState } from "react"
import { deleteProject } from "@/lib/services"
import { useRouter } from "next/navigation"

const DeleteBtn = ({ id }: { id: string }) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  function handleDelete() {
    setIsLoading(true)
    try {
      const response = deleteProject(id)
      toast({
        title: "Project Uploaded !!!",
      })
      router.push("/")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast({
        variant: "destructive",
        title: "Error:",
        description: `${error}`,
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl">Confirm Delete</DialogTitle>
          <DialogDescription>
            This will permanently delete the project, are you sure ?
          </DialogDescription>
        </DialogHeader>
        <Button variant="destructive" onClick={() => handleDelete()}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Confirm Delete
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteBtn
