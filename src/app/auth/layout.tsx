import Navbar from "@/components/nav";
import React, { Suspense } from "react";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
        <div className="h-screen flex flex-col">
            <div className="flex-1 flex items-center justify-center">
                {children}
            </div>
        </div>
        </Suspense>
    )
}