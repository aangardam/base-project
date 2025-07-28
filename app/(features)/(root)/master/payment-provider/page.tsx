"use client"

import { RootLayout } from "@/shared/components/layout/root-layout"
import { Card, CardContent } from "@/shared/components/ui/card"

import Client from "./components/client"

export default function MasterPaymentProviderPage() {
  return (
    <RootLayout title="Payment Provider">
      <Card className="rounded-2xl shadow-md border border-gray-200 bg-white">
        <CardContent>
          <Client />
        </CardContent>
      </Card>
    </RootLayout>
  )
}
