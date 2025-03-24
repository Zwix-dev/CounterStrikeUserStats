"use client"
import { Crosshair } from "lucide-react";
import { Button } from "./ui/button";
import { getFaceitPlayerBySteam } from "@/data/player"
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
    const [error, setError] = useState<string | null>(null)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHaveSomething(e.target.value.trim().length > 0)
    }

    const handleSearch = async () => {
        if (!inputRef.current?.value) return

        try {
            const result = await getFaceitPlayerBySteam(inputRef.current.value)
            
            if (!result) {
                setError("Aucun résultat trouvé")
                setUserData(null)
                return
            }
            if ('errors' in result) {
                setError(result.errors[0].message)
                setUserData(null)
            } else {
                setError(null)
                setUserData(result)
            }
        } catch (e) {
            console.error("Erreur:", e)
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
                id="steam"
                className={`w-full py-3 pl-3 pr-4 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 ${error ? 'border-red-500 border-1' : ''}`}
            />
            {error && 
                <p className="text-red-400 absolute">Erreur : {error}</p>
            }
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
            {userData && !error && (
                <Link href={`/player/${userData.steam_id_64}`}>
                    <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg p-4 hover:bg-gray-200 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <img src={userData.avatar} alt={userData.nickname} className="w-12 h-12 rounded-full" />
                            <div className="w-full">
                                <div className="flex flex-row gap-2 ">
                                    <p className="font-bold text-black">{userData.nickname}</p>
                                    <div className="mt-1 flex flex-row gap-1">
                                        {/* <Link href={`https://leetify.com/app/profile/${userData.steam_id_64}`} target="_blank">
                                            <img src="/icons/leetify_logo.jpeg" className="rounded w-4" alt="" />
                                        </Link>
                                        <Link href={`https://csstats.gg/fr/player/${userData.steam_id_64}`} target="_blank">
                                            <img src="/icons/csstats.png" className="rounded w-4" alt="" />
                                        </Link> */}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">{userData.steam_nickname}</p>
                            </div>
                            {
                                !error && userData?.games?.cs2 && (
                                <div className="flex flex-row w-full justify-end items-end mr-4">
                                    {userData.games.cs2?.faceit_elo && (
                                        <div className="flex flex-row gap-2">
                                            <p className="font-stretch-50%">{userData.games.cs2?.faceit_elo}</p>
                                            {userData.games.cs2.skill_level && (
                                                <img src={`/icons/xp/${userData.games.cs2.skill_level}.png`} width={25} height={20} alt="" />
                                            )}
                                          
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </Link>
            )}
        </div>
    )
}