"use client"

import {
  Home,
  UserIcon,
  Menu,
  // ChevronDown,
  Settings,
  LogOut,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"

import { usePathname } from "next/navigation"
import { useUserStore } from "@/shared/store/user.store"
import { useAuthentication } from "@/shared/store/logout.store"
import { useSidebarContex } from "@/shared/contexts/sidebar-context"
import { Separator } from "../ui/separator"
import React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import Link from "next/link"

type HeaderProps = {
  title?: string
}

export function Header({ title }: HeaderProps) {
  const { user, logout } = useUserStore()
  const { setAuthenticated } = useAuthentication();
  const { toggleSidebar } = useSidebarContex()
  
  const pathName = usePathname()

  let segments: string[] = []
  if (pathName !== "/") {
    segments = pathName.split("/").filter(Boolean)
  } 

  const detailIndex = segments.indexOf("detail")
  if (detailIndex !== -1 && segments.length > detailIndex + 1) {
    segments = segments.slice(0, detailIndex + 1) // keep up to "detail"
  }

  const formatSegment = (segment: string) =>
    segment
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  
  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    window.location.href = '/login';
  }

  return (
    <header className="bg-gray-100 border-b px-4 py-3 flex flex-cols justify-between gap-2 sticky top-0 z-10">
      <div className="flex justify-start text-sm text-gray-500 gap-1">
          <button
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-md"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Separator className="my-1" orientation="vertical"/>
      </div>
      <div className="flex flex-col w-full mt-2">
          {/* {title && (
            <h1 className="text-xl font-semibold text-gray-800 text-nowrap">
              {title}
            </h1>
          )} */}
        <div className="flex items-center gap-2 mt-2 text-sm flex-wrap">
          <Breadcrumb>
            <BreadcrumbList>
              {/* Always show Home as the first breadcrumb */}
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="inline-flex items-center gap-1">
                  <Home className="h-4 w-4 text-gray-600" />
                  <span>Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {/* If not root, show separators and additional segments */}
              {segments.length > 0 &&
                segments.map((segment, index) => {
                  const isLast = index === segments.length - 1;
                  const afterHome = index === 0;
                  const href = "/" + segments.slice(0, index + 1).join("/");
                  // console.log(afterHome, isLast, segment, index, href);
                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast || afterHome ? (
                          <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>{formatSegment(segment)}</BreadcrumbLink>
                        )}
                        {/* <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage> */}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

      </div>

      <div className="flex justify-end text-sm text-gray-500 gap-1 w-1/2">
        {/* <div className="h-full flex items-center gap-2">
          <div className="bg-gray-300 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
            <UserIcon className="h-4 w-4" />
          </div>
          <div className="hidden sm:flex flex-col justify-center text-left leading-tight">
            <span className="text-gray-800 text-sm">
              {user?.fullName}
            </span>
            <span className="text-gray-500 text-xs">
              {role}
            </span>
          </div>
        </div> */}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="h-full flex items-center">
              <button className="flex items-center gap-2 hover:bg-gray-200 rounded-full px-3 py-2 transition">
                <div className="bg-gray-300 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  <UserIcon className="h-4 w-4" />
                </div>
                <div className="hidden sm:flex flex-col justify-center text-left leading-tight">
                  <span className="text-gray-800 text-sm">
                    {user?.fullName}
                  </span>
                </div>
                {/* <ChevronDown className="h-4 w-4 text-gray-500" /> */}
              </button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 -mt-2">
            {/* <DropdownMenuItem className="cursor-pointer">
              <Link
                href="/user-settings"
                className="flex items-center gap-2 px-3 py-2 transition -ml-3"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>User Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem className="cursor-pointer">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="-ml-3"
              >
               <LogOut className="mr-2 h-4 w-4" />
               <span>Logout</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> 
      </div>
    </header>
  )
}
