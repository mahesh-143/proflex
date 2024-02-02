"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { editProject } from "@/lib/services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { UploadButton } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const projectFormSchema = z.object({
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
});
type ProjectFormSchema = z.infer<typeof projectFormSchema>;

type Props = {
  id: string;
  projectInfo: {
    title: string | null;
    category: string | null;
    liveLink: string | null;
    githubLink: string | null;
    description: string | null;
    thumbnail: string | null;
  } | null;
};

export default function EditProjectForm({ id, projectInfo }: Props) {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  // This can come from your database or API.
  const defaultValues: Partial<ProjectFormSchema> = {
    title: projectInfo?.title as string,
    category: projectInfo?.category as string,
    description: projectInfo?.description as string,
    githubLink: projectInfo?.githubLink as string,
    liveLink: projectInfo?.liveLink as string,
  };

  const form = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProjectFormSchema) {
    try {
      setIsLoading(true);
      const response = await editProject({ id, thumbnail, ...data });
      toast({
        title: "Project Edited !!!",
      });
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error:",
        description: `${error}`,
      });
    }
  }

  return (
    <Form {...form}>
      <Link href="..">
        <Button variant="ghost">
          <ArrowLeft />
        </Button>
      </Link>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1>Update thumbnail</h1>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setThumbnail(res?.at(0)?.url);
            toast({
              title: "Upload Successfull!!!",
            });
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast({
              variant: "destructive",
              title: "Error:",
              description: `${error.message}`,
            });
          }}
        />

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
                <Input
                  placeholder="https://github.com/<username>/<repositoryname>"
                  {...field}
                />
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
  );
}
