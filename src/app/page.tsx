"use server"

import InputSearch from "@/components/inputSearch";

export default async function Home() {

  return (
    <main className="h-screen bg-gray-50 overflow-hidden">
      <section className="bg-[url('/cs2-bg.png')] bg-cover bg-center h-screen">
        <div className="text-6xl font-bold md:flex flex-row justify-center md:gap-6 pt-22 md:pt-56 text-center">
          <h1 className=" text-white">TROUVE</h1>
          <h1 className="text-purple-300 "> LES </h1>
          <h1 className="text-purple-500"> CHEATERS </h1>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex flex-col mt-32 w-full items-center">
            <InputSearch />
          </div>
        </div>
      </section>
    </main>
  );
}
