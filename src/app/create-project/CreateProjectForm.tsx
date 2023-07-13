"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { createProject, updateUser } from "@/lib/services"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Icons } from "@/components/icons"

const ProjectFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Project title must be at least 2 characters.",
    })
    .max(30, {
      message: "Project title must not be longer than 30 characters.",
    }),
  category: z.string(),
  description: z.string().max(160).min(4),
  githubLink: z.string().optional(),
  liveLink: z.string().optional(),
})

export function CreateProjectForm() {
  const router = useRouter()
  const session = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof ProjectFormSchema>>({
    resolver: zodResolver(ProjectFormSchema),
  })

  async function onSubmit(data: z.infer<typeof ProjectFormSchema>) {
    try {
      setIsLoading(true)
      const response = await createProject({ ...data })
      toast({
        title: "Project Uploaded !!!",
      })
      setIsLoading(false)
      router.push("/")
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Fullstack">Fullstack</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select your project category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your project"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/<username>/<repositoryname>" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="liveLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Upload Project
        </Button>
      </form>
    </Form>
  )
}
