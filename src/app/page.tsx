import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export default function Home() {
  return (
    <div className="mx-6 pt-6">
      <Tabs defaultValue="overview" className="space-y-4 ">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <h1>Tab Content</h1>
        </TabsContent>
      </Tabs>
    </div>
  )
}
