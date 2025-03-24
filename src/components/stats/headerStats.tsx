import { getFaceitPlayerBySteam, getSteamPlayerBySteam } from "@/data/player"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Target, TrendingUp, Trophy, Users } from "lucide-react"
import Link from "next/link"
interface Props {
    id: string;
}
interface playerData {
    id64: string,
    username: string,
    realName: string,
    avatarfull: string


}
export default async function HeaderStats({ id }: Props) {
    const playerData = await getSteamPlayerBySteam(id)
    const faceitData = await getFaceitPlayerBySteam(id)
    return (
        <div className="container mx-auto mt-8 px-4">
            <div className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-800">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative">
                        <img
                            src={playerData.response.players[0].avatarfull}
                            alt="avatar"
                            width={100}
                            height={100}
                            className="rounded-full border-2 border-purple-600"
                        />
                    </div>
                    <div>
                        <div className="flex flex-row bg-red w-full items-center gap-3">
                            <h1 className="font-bold text-2xl">{playerData.response.players[0].personaname}</h1>
                            <Link href={`https://leetify.com/app/profile/${id}`} target="_blank">
                                <img src="/icons/leetify_logo.jpeg" className="rounded mt-1" width={35} alt="" />
                            </Link>
                            <Link href={`https://csstats.gg/fr/player/${id}`} target="_blank">
                                <img src="/icons/csstats.png" className="rounded mt-1" width={35} alt="" />
                            </Link>
                            <Link href={`https://www.faceit.com/fr/players/${faceitData.nickname}`} target="_blank">
                                <img src="/faceit_logo.webp" className="rounded mt-1" width={35} alt="" />
                            </Link>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <img
                                src={`https://flagcdn.com/24x18/${playerData.response.players[0].loccountrycode.toLowerCase()}.png`} width={16} height={10}
                            />
                            
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-end mt-3">
                        <img src={`/icons/xp/${faceitData.games.cs2?.skill_level}.png`} width={60} alt="" />

                    </div>
                </div>
            </div>
        </div>
    )
}



