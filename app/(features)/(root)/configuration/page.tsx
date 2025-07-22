"use client"

import { RootLayout } from "@/shared/components/layout/root-layout"
import { Card, CardContent } from "@/shared/components/ui/card"
import Link from "next/link"
import { BsSliders, BsListCheck } from "react-icons/bs"

const ConfigurationPage = () => {
    const configMenus = [
        {
            title: "Application Parameter",
            icon: <BsListCheck className="text-3xl text-primary" />,
            href: "/configuration/application-parameter",
        },
        {
            title: "System Setting",
            icon: <BsSliders className="text-3xl text-primary" />,
            href: "/configuration/system-setting",
        },
    ]

    return (
        <RootLayout title="Configuration">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
                {configMenus.map((menu, index) => (
                    <Link key={index} href={menu.href}>
                        <Card className="rounded-xl shadow-md border border-gray-200 bg-white hover:shadow-xl hover:border-primary transition-all duration-300 cursor-pointer">
                            <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                                <div className="bg-primary/10 rounded-full p-4">
                                    {menu.icon}
                                </div>
                                <h2 className="text-lg font-semibold text-center text-gray-800">
                                    {menu.title}
                                </h2>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </RootLayout>
    )
}

export default ConfigurationPage
