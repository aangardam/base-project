"use client"

import type { ReactNode } from "react"
import Sidebar from '@/shared/components/layout/sidebar/sidebar';
import { Header } from "./header"
import { SidebarProvider } from "@/shared/contexts/sidebar-context";
import { motion } from "framer-motion";
import { useAuthRedirect } from "@/shared/hooks/use-auth-redirect";
import { useLogoutListener } from "@/shared/hooks/use-logout-listener";
import Loading from "@/shared/components/commons/loading/loading";
import { Toaster } from "../ui/toaster";
// import { Sidebar } from "./sidebar";

type RootLayoutProps = {
  children: ReactNode
  title?: string
}

export function RootLayout({ children, title }: RootLayoutProps) {
  const isLoading = useAuthRedirect();
  useLogoutListener();
  
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SidebarProvider>
          <div className="flex h-screen bg-slate-50">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
              <Header title={title} />
              
              <main className="flex-1 overflow-auto p-4 md:p-8 bg-slate-50">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="space-y-4"
                >
                  {children}
                </motion.div>
              </main>
              <Toaster />
              

              <footer className="p-4 text-sm text-gray-500 border-t bg-white">
                {/* Settlement ASDP – <span className="font-bold">SETTLER</span> v1.0.0
                © {new Date().getFullYear()} SETTLER ASDP — v1.0.0 */}
                <div className="flex items-center justify-between">
                  <div className="flex justify-start">
                    Settlement ASDP  –  <span className="font-bold"> &nbsp;SETTLER&nbsp; </span>  | Copyright {new Date().getFullYear()}
                  </div>
                  <div className="flex justify-end">
                    Version : 1.0.0
                  </div>

                </div>
              </footer>
            </div>
          </div>
        </SidebarProvider>
      )}
    </>
    
  )
}
