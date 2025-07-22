"use client"

import { RootLayout } from "@/shared/components/layout/root-layout"
import { Card, CardContent } from "@/shared/components/ui/card"
import FormFilter from "./components/form-filter"
import Client from "./components/client"
import { Separator } from "@radix-ui/react-separator"

// import Client from "./components/client"

export default function BusinessPartnerIntegrationPage() {
  return (
    <RootLayout title="Business Partner Integration">
      <Card className="rounded-2xl shadow-md border border-gray-200 bg-white">
        <CardContent>
          <FormFilter />
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-md border border-gray-200 bg-white mt-2">
        <CardContent>
          <h1 className="text-xl font-semibold mt-5">Business Partner Integration</h1>
          <span className="text-base font-semobild text-italic mb-2">
            <i>View invoice data, payments, and transaction details sent by the business partner for reconciliation and SAP posting.</i>
          </span>
          <Separator className="my-1 h-px bg-gray-200 mt-5" />
          <Client />
        </CardContent>
      </Card>
    </RootLayout>
  )
}
