/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ChevronDown, ChevronUp } from "lucide-react"
import { useSidebarContex } from "@/shared/contexts/sidebar-context"

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useSidebarContex()
  const pathname = usePathname()

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-30 bg-[#001a33] text-white transform transition-all duration-300 ease-in-out lg:relative ${
          sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"
        }`}
      >
        <div className={`flex items-center gap-2 p-6 ${!sidebarOpen && "lg:justify-center"}`}>
          <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
            <div className="bg-[#001a33] rounded-full w-6 h-6"></div>
          </div>
          <span className={`font-semibold text-lg ${!sidebarOpen && "lg:hidden"}`}>
            Settler Web App V2
          </span>
        </div>

        <div className="mt-8">
            {/* Menu langsung */}
            <NavLinkItem
              href="/menu"
              icon={<LayoutDashboard size={20} />}
              label="Menu"
              pathname={pathname}
              sidebarOpen={sidebarOpen}
            />

            {/* Menu dengan submenu */}
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Master"
              pathname={pathname}
              sidebarOpen={sidebarOpen}
            >
            <SubNav href="/menu" pathname={pathname}>Menu</SubNav>
            <SubNav href="/users" pathname={pathname}>Users</SubNav>
          </NavItem>
        </div>
      </div>
    </>
  )
}

type NavLinkItemProps = {
  href: string
  icon: ReactNode
  label: string
  sidebarOpen: boolean
  pathname: string
}

function NavLinkItem({ href, icon, label, sidebarOpen, pathname }: NavLinkItemProps) {
  const isActive = pathname === href

  const baseClasses = `flex items-center gap-3 py-3 px-6 w-full ${
    !sidebarOpen ? "lg:justify-center lg:px-0" : ""
  } ${isActive ? "bg-[#002b52] text-white" : "text-gray-300 hover:text-white hover:bg-[#002b52]"}`

  return (
    <Link href={href} className={baseClasses}>
      {icon}
      <span className={!sidebarOpen ? "lg:hidden" : ""}>{label}</span>
    </Link>
  )
}

type NavItemProps = {
  icon: ReactNode
  label: string
  sidebarOpen: boolean
  pathname: string
  children?: ReactNode
}

function NavItem({ icon, label, sidebarOpen, pathname, children }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasActiveChild =
    Array.isArray(children) &&
    children.some(
      (child: any) => child?.props?.href && pathname === child.props.href
    )

  const baseClasses = `flex items-center gap-3 py-3 cursor-pointer w-full ${
    !sidebarOpen ? "lg:justify-center lg:px-0" : "px-6"
  } ${hasActiveChild ? "bg-[#002b52] text-white" : "hover:bg-[#002b52] text-gray-300 hover:text-white"}`

  return (
    <div className="w-full">
      <div
        className={baseClasses}
        onClick={() => {
          if (children) setIsOpen(!isOpen)
        }}
      >
        {icon}
        <span className={!sidebarOpen ? "lg:hidden" : ""}>{label}</span>
        {children && sidebarOpen && (
          <span className="ml-auto">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        )}
      </div>

      {children && isOpen && sidebarOpen && (
        <div className="ml-10 mt-1 space-y-2">{children}</div>
      )}
    </div>
  )
}

type SubNavProps = {
  href: string
  pathname: string
  children: ReactNode
}

function SubNav({ href, pathname, children }: SubNavProps) {
  const isActive = pathname === href
  return (
    <Link
      href={href}
      className={`block text-sm px-2 py-1 rounded ${
        isActive
          ? "bg-[#00395f] text-white"
          : "text-gray-300 hover:text-white hover:bg-[#00395f]"
      }`}
    >
      {children}
    </Link>
  )
}
