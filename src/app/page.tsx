"use server"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRoundSearch } from "lucide-react";

export default async function Home() {

  return (

    <main className="h-screen bg-gray-50">
      <section className="bg-[url('/cs2-bg.png')] bg-cover bg-center h-full ">
        <div className="flex flex-col px-4 py-8 h-full">
          <div className="flex flex-col mt-64 w-full items-center">
            <div className="relative w-full max-w-md">
              <input type="text" placeholder="SteamUrl" className="w-full py-3 pl-3 pr-4 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:bg-gray-500 rounded-lg">
                <Button className="bg-inherit hover:bg-gray-500">
                  <UserRoundSearch/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
