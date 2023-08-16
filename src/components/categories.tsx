"use client"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { categoryFilters } from "@/constant"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

export const Filter = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const category = searchParams.get("category")

  const handleTags = (item: string | null) => {
    router.push(`${pathName}?category=${item}`)
  }

  return (
    <Tabs
      defaultValue="all"
      className="sm:space-y-8 flex flex-col items-center"
    >
      <TabsList className="inline-flex overflow-x-scroll sm:overflow-auto w-full sm:w-fit bg-transparent sm:bg-muted  pl-40 sm:pl-1">
        <TabsTrigger value="all" onClick={() => router.push("/")}>
          All
        </TabsTrigger>
        {categoryFilters.map((category) => {
          return (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => handleTags(category)}
            >
              {category}
            </TabsTrigger>
          )
        })}
      </TabsList>
      <TabsContent value={category ? category : "all"} className="sm:space-y-8">
        {children}
      </TabsContent>
    </Tabs>
  )
}
