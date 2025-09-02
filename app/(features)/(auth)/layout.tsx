'use client' // penting untuk App Router
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Toaster } from "@/shared/components/ui/sonner";
import Image from "next/image";
import { Moon, Sun } from 'lucide-react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
      <div>
        <div className="flex min-h-screen flex-col md:flex-row">
          <div className="hidden md:flex flex-1 bg-blue-500 text-white items-center justify-center p-10">
            <div className="max-w-md text-center">
              <Image
                src="/images/image-login2.png"
                  alt="Base Project Web App Illustration"
                  width={400}
                  height={400}
                  className="mx-auto mb-6"
              />
              <h2 className="text-2xl font-bold mb-2">
                  Welcome to Base Project Web App
              </h2>
            </div>
          </div>

          <div className="flex-1 p-6 flex flex-col justify-center">
            {/* <div className='flex flex-col gap-4 items-end'>
              <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-2 border rounded"
                >
                  {theme === 'light' ? <Sun className="text-muted-foreground" /> : <Moon className="text-muted-foreground" />}
              </button>
            </div> */}
            {children}
          </div>
          <Toaster 
            position="top-right"
            expand={true}
            richColors
            closeButton
          />
        </div>
      </div>
  );
};

export default AuthLayout;