import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="mx-4 lg:mx-80">
      <h1 className="text-[#4E4187] text-center font-bold my-6 uppercase">
        Proflex Hiring
      </h1>
      <h2 className="text-6xl text-center mb-4">
        Hire the world’s top Developers
      </h2>
      <p className="text-center text-gray-600 text-lg mb-4">
        Find the perfect match for your next project using Developer Search, or
        let developers come to you through our Job Board. Proflex Hiring makes
        it easier than ever to source top-notch talent.
      </p>

      <div className="p-4 max-w-xl mx-auto">
        {/* <JobForm /> */}
        <Card className="max-w-md m-auto">
          <CardHeader>
            <h2 className="font-medium text-2xl">Job Board </h2>
            <p className="py-2 text-gray-600">
              Let top creative talent come to you by posting your listing on
              &#35;1 developer job board
            </p>
          </CardHeader>
          <CardContent>
            <h2 className="font-medium text-4xl">$1/post</h2>
            <ul className="flex flex-col gap-2 py-4 text-gray-600 list-disc list-inside">
              <li>Average of 1.1k targeted clicks per month</li>
              <li>Easily hire for full-time or freelance placements</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="text-lg">
              Post Job
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
