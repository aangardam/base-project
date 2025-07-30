"use client"

import { RootLayout } from "@/shared/components/layout/root-layout"
import { Card, CardContent } from "@/shared/components/ui/card"
import { MenuTree } from "./components/menu-tree"
import Client from "./components/client"


export default function MenuPage() {
  return (
    <RootLayout title="Menu">
        <Card className="rounded-2xl shadow-md border border-gray-200 bg-white">
            <CardContent className="max-h-[80vh] overflow-y-auto scrollbar-hide overflow-x-hidden">
                <MenuTree />
            </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md border border-gray-200 bg-white">
            <CardContent>
              <Client />
            </CardContent>
        </Card>
    </RootLayout>
  )
}
