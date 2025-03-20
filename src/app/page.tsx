"use server"

import InputSearch from "@/components/inputSearch";

export default async function Home() {

  return (
    <main className="h-screen bg-gray-50">
      <section className="bg-[url('/cs2-bg.png')] bg-cover bg-center h-full ">
        <div className="text-6xl font-bold flex flex-row justify-center gap-6 pt-52">
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
