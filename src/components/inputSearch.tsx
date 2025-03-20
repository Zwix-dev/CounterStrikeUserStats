"use client"
import { Crosshair } from "lucide-react";
import { Button } from "./ui/button";
import { getPlayerBySteam } from "@/data/player"
import { useState, useRef } from "react";
import Link from "next/link";
interface UserData {
    player_id: string;
    nickname: string;
    avatar: string;
    country: string;
    faceit_url: string;
    steam_nickname: string;
    steam_id_64: number;
    games: {
        csgo?: {
            faceit_elo: number;
            skill_level: number
            // Ajoutez les propriétés spécifiques à csgo si nécessaire
        };
        cs2?: {
            faceit_elo: number;
            skill_level: number

        };
    };
}
export default function InputSearch() {

    const [haveSomething, setHaveSomething] = useState(false)
    const [userData, setUserData] = useState<UserData | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHaveSomething(e.target.value.trim().length > 0)
    }

    const handleSearch = async () => {
        if (!inputRef.current?.value) return

        try {
            const result = await getPlayerBySteam(inputRef.current.value)
            setUserData(result)
            console.log(result)
        } catch (error) {
            console.error("Erreur:", error)
            setUserData(null)
        }
    }

    const handleClear = () => {
        setHaveSomething(false)
        setUserData(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }
    return (
        <div className="relative w-full max-w-md">
            <input
                ref={inputRef}
                type="text"
                placeholder="SteamUrl"
                onChange={handleChange}
                list="userList"
                className="w-full py-3 pl-3 pr-4 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white rounded-lg">
                <Button
                    className="hover:bg-gray-800"
                    onClick={handleSearch}
                >
                    <Crosshair />
                </Button>
            </div>
            <datalist id="userList">
                {userData && (
                    <option
                        key={userData.player_id}
                        value={`${userData.nickname} (${userData.steam_nickname})`}
                    />
                )}
            </datalist>
            {userData && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg p-4">
                    <div className="flex items-center gap-4">
                        <img src={userData.avatar} alt={userData.nickname} className="w-12 h-12 rounded-full" />
                        <div className="w-full">
                            <div className="flex flex-row gap-2 ">
                                <p className="font-bold text-black">{userData.nickname}</p>
                                <div className="mt-1 flex flex-row gap-1">
                                    <Link href={`https://leetify.com/app/profile/${userData.steam_id_64}`} target="_blank">
                                        <img src="/icons/leetify_logo.jpeg"  className="rounded w-4" alt="" />
                                    </Link>
                                    <Link href={`https://csstats.gg/fr/player/${userData.steam_id_64}`} target="_blank">
                                        <img src="/icons/csstats.png" className="rounded w-4" alt="" />
                                    </Link>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{userData.steam_nickname}</p>
                        </div>
                        <div className="flex flex-row w-full justify-end items-end mr-4">

                            {userData.games.cs2?.faceit_elo && (
                                <div className="flex flex-row gap-2">
                                    <p className="font-stretch-50%">{userData.games.cs2?.faceit_elo}</p>
                                    {userData.games.cs2.faceit_elo >= 100 && userData.games.cs2.faceit_elo < 500 && (
                                        <img src="/icons/xp/level5001.png" width={25} height={20} alt="" />
                                    )}
                                    {userData.games.cs2.faceit_elo >= 501 && userData.games.cs2.faceit_elo < 750 && (
                                        <img src="/icons/xp/level5002.png" width={25} height={20} alt="" />
                                    )}
                                    {userData.games.cs2.faceit_elo >= 751 && userData.games.cs2.faceit_elo < 900 && (
                                        <img src="/icons/xp/level5003.png" width={25} height={20} alt="" />
                                    )}
                                    {userData.games.cs2.faceit_elo >= 901 && userData.games.cs2.faceit_elo < 1050 && (
                                        <img src="/icons/xp/level5004.png" width={25} height={20} alt="" />
                                    )}
                                    {userData.games.cs2.faceit_elo >= 1051 && userData.games.cs2.faceit_elo < 1200 && (
                                        <img src="/icons/xp/level5005.png" width={25} height={20} alt="" />
                                    )}
                                    {userData.games.cs2.faceit_elo >= 1201 && userData.games.cs2.faceit_elo < 1350 && (
                                        <img src="/icons/xp/level5006.png" width={25} height={20} alt="" />
                                    )}
                                    {userData.games.cs2.faceit_elo >= 1351 && userData.games.cs2.faceit_elo < 1530 && (
                                        <img src="/icons/xp/level5007.png" width={25} className="rounded-sm " alt="" />
                                    )}
                                    {userData.games.cs2.faceit_elo >= 1531 && userData.games.cs2.faceit_elo < 1750 && (
                                        <img src="/icons/xp/level5008.png" width={25} height={20} alt="" />
                                    )}
                                    {userData.games.cs2.faceit_elo >= 1751 && userData.games.cs2.faceit_elo < 2000 && (
                                        <img src="/icons/xp/level5009.png" width={25} height={20} alt="" />
                                    )}
                                    {userData.games.cs2.faceit_elo >= 2000 && (
                                        <img src="/icons/xp/level50010.png" width={25} height={20} alt="" />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}