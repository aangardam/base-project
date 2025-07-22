"use client"

// import { useParams } from "next/navigation"
import { RootLayout } from "@/shared/components/layout/root-layout"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import Link from "next/link"
import { BsArrowLeftCircleFill } from "react-icons/bs"

const DetailBussniesPartner = () => {
    // const { id } = useParams()
    return (
        <RootLayout title="Business Partner Integration">
            <div className="flex justify-between items-center">
                <Link href="/reporting/business-partner-integration">
                    <button className="flex items-center gap-2 hover:bg-gray-200 rounded-full px-3 py-2 transition">
                        <BsArrowLeftCircleFill className="h-4 w-4" />
                        <span className="text-xl font-semibold">Back to Business Partner Integration</span>
                    </button>
                </Link>
            </div>
            <Card className="rounded-2xl shadow-md border border-gray-200 bg-white mt-2">
                <CardContent>
                <h1 className="text-xl font-semibold mt-5">Detail Business Partner Integration</h1>
                <span className="text-base font-semobild text-italic mb-2">
                    <i>View invoice data, payments, and transaction details sent by the business partner for reconciliation and SAP posting.</i>
                </span>
                <Separator className="my-1 h-px bg-gray-200 mt-5" />
                    {/* <Client /> */}
                </CardContent>
            </Card>
        </RootLayout>
    )
}

export default DetailBussniesPartner