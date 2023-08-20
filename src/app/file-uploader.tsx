"use client";
import "@uploadthing/react/styles.css";
import { useToast } from "@/components/ui/use-toast"

import { UploadButton } from "../lib/uploadthing";

export default function FileUploader() {
    const { toast } = useToast()
    return (
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    toast({
                        title: "Upload Successfull!!!",
                    })

                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    toast({
                        variant: "destructive",
                        title: "Error:",
                        description: `${error.message}`,
                    })

                }}
            />
    );
}
