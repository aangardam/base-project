"use client"

import { RootLayout } from "@/shared/components/layout/root-layout"
import { Card, CardContent } from "@/shared/components/ui/card"
import FormFilter from "./components/form-filter"
import Client from "./components/client"

// import Client from "./components/client"

export default function LogRequestBussniesPartnerPage() {
  return (
    <RootLayout title="Logs Request - Bussiness Partner">
      <Card className="rounded-2xl shadow-md border border-gray-200 bg-white">
        <CardContent>
          <FormFilter />
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-md border border-gray-200 bg-white mt-2">
        <CardContent>
          <Client />
        </CardContent>
      </Card>
    </RootLayout>
  )
}
