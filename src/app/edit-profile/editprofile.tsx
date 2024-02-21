"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { updateUser } from "@/lib/services";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  role: z.string().optional(),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  githubLink: z.string().optional(),
  linkedinLink: z.string().optional(),
  UserType: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
export function Editprofile(props: {
  userInfo: {
    name: string | null;
    email: string | null;
    image: string | null;
    bio: string | null;
    Developer: {
      githubLink: string | null;
      linkedinLink: string | null;
    } | null;
    UserType: string | null;
  } | null;
}) {
  const router = useRouter();
  const [image, setImage] = useState<string | undefined>();

  const defaultValues: Partial<ProfileFormValues> = {
    name: props.userInfo?.name as string,
    email: props.userInfo?.email as string,
    bio: props.userInfo?.bio as string,
    githubLink: props.userInfo?.Developer?.githubLink as string,
    linkedinLink: props.userInfo?.Developer?.linkedinLink as string,
    UserType: props.userInfo?.UserType as string,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      const response = await updateUser({ image, ...data });
      toast({
        title: "Profile Update !!!",
      });
      router.push("myprofile");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error:",
        description: `${error}`,
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Avatar className="w-40 h-40 m-auto">
          <AvatarImage
            src={props.userInfo?.image || "default.png"}
            alt={"User Profile Picture"}
          />
          <AvatarFallback className="text-7xl">
            {props.userInfo?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImage(res?.at(0)?.url);
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
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {props.userInfo?.UserType == "Developer" && (
          <>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Fullstack">
                        Fullstack Developer
                      </SelectItem>
                      <SelectItem value="Frontend">
                        Frontend Developer
                      </SelectItem>
                      <SelectItem value="Backend">Backend Developer</SelectItem>
                      <SelectItem value="Mobile">Mobile Developer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select what describes you the best.
                  </FormDescription>
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
                      placeholder="https://github.com/<username>"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Linkedin</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/<username>"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={form.control}
          name="UserType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>I am </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a suitable role to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Employer">Employer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
