"use server"
import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import FaceitStats from "@/components/stats/faceit"
import LeetifyStats from "@/components/stats/leetify"
import InputSearch from "@/components/inputSearch"
import PlayerStats from "@/components/stats/generalStats"
import HeaderStats from "@/components/stats/headerStats"


async function getPlayerData(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
        id,
        username: "Z_Zwix",
        realName: "Zwix",
        level: 10,
        elo: 1421,
        matches: 245,
        winRate: 58.4,
        kdRatio: 1.24,
        headshots: 62.7,
        platforms: {
            steam: true,
            faceit: true,
            leetify: true,
        },
    }
}
interface PageProps {
    params: Promise<{
        id: string
    }>
}
export default async function PlayerPage(props: PageProps, avatarUrl: string) {
    const params = await props.params;
    const playerId = params.id;
    const playerData = await getPlayerData(playerId)



    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
            <div className="bg-[url('/cs2-bg.png')] bg-cover bg-center w-full">
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
            </div>

            <HeaderStats id={params.id}/>
            <div className="container mx-auto mt-8 px-4 pb-16">
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-8 bg-gray-800">
                        <TabsTrigger value="general" className="text-white focus:text-black">Statistiques Générales</TabsTrigger>
                        <TabsTrigger value="faceit" className="text-white focus:text-black">FACEIT</TabsTrigger>
                        <TabsTrigger value="leetify" className="text-white focus:text-black">Leetify</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general">
                        <Suspense fallback={<StatsLoading />} >
                            <PlayerStats playerId={params.id} />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="faceit">
                        <Suspense fallback={<StatsLoading />}>
                            <FaceitStats playerId={params.id} />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="leetify">
                        <Suspense fallback={<StatsLoading />}>
                            <LeetifyStats playerId={params.id} />
                        </Suspense>
                    </TabsContent>
                </Tabs>
            </div>
          
        </main>
    )
}

function StatsLoading() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="bg-slate-800 border-slate-700">
                    <CardHeader>
                        <Skeleton className="h-8 w-48 bg-slate-700" />
                        <Skeleton className="h-4 w-32 bg-slate-700 mt-2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-32 w-full bg-slate-700" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

