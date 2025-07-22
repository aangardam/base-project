import { Toaster } from "@/shared/components/ui/toaster";
import { Scale } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">

        <div className="hidden md:flex flex-1 bg-blue-700 text-white items-center justify-center p-10 animate-fade-in">
            <div className="max-w-md text-center">
              <Image
                  src="/image-login2.png?height=400&width=400"
                  alt="Settler Web App Illustration"
                  width={400}
                  height={400}
                  className="mx-auto mb-6"
              />
              <div className="flex items-center gap-4 justify-center">
                <Scale className="w-6 h-6" />
                <h2 className="text-2xl font-bold">SETTLER</h2>
              </div>
              <p className="text-base"> ASDP Settlement Integrate, Reconcile Data, Resolve, Dispute Handling</p>
            </div>
        </div>

        <div className="flex-1 p-6 md:p-10 flex flex-col justify-center animate-fade-in ">
            {children}
        </div>
        <Toaster />
    </div>
  )
}