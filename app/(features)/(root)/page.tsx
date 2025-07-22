"use client"

import { RootLayout } from "@/shared/components/layout/root-layout"
import { useUserStore } from "@/shared/store/user.store";

export default function HomePage() {
  const { user } = useUserStore();  
  // Define breadcrumbs for home page

  return (
    <RootLayout title="Welcome Page">
      <h1 className="text-xl font-bold mb-6">
        Welcome back, {user?.fullName}!
      </h1>

    </RootLayout>
  )
}
