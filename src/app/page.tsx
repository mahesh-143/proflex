import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { categoryFilters } from "@/constant"

export default function Home() {
  return (
    <div className="mx-4 mt-8">
      <Tabs defaultValue="all" className="space-y-8 grid place-items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {categoryFilters.map((category) => {
            return (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            )
          })}
        </TabsList>
        <TabsContent value="all" className="space-y-8">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet . Officia nisi error maiores. fmsa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={"/demoimage.jpg"}
                  alt="project thumbnail"
                  width={300}
                  height={200}
                  className="w-full"
                />
              </CardContent>
              <CardFooter>
                <p>by author</p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
