"use client"

import { RootLayout } from "@/shared/components/layout/root-layout"
import { Card, CardContent } from "@/shared/components/ui/card"
import { MenuTree } from "./components/menu-tree"


export default function MenuPage() {
  return (
    <RootLayout title="Menu">
        <Card className="rounded-2xl shadow-md border border-gray-200 bg-white">
            <CardContent>
                <MenuTree />
            </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md border border-gray-200 bg-white">
            <CardContent>
            {/* <Client /> */}
            list client
            </CardContent>
        </Card>
    </RootLayout>
  )
}
