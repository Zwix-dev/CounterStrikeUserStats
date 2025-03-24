"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts"

import Image from "next/image"
import { getFaceit, getFaceitPlayerBySteam } from "@/data/player"

interface Match {
  match_id: string;
  started_at: number;
  finished_at: number;

  results: {
      winner: string;
      score: {
          faction1: number;
          faction2: number;
      }
  };
  teams: {
      faction1: Team;
      faction2: Team;
  }
}

interface Team {
  nickname: string;
  players: Player[];
}

interface Player {
  nickname: string;
  avatar: string;
  skill_level: number;
  player_id: string;
}


const generateFaceitData = (playerId: string) => {
  return {
    eloHistory: Array.from({ length: 30 }, (_, i) => ({
      match: i + 1,
      elo: 1200 + Math.floor(Math.random() * 400),
    })),
    levelDistribution: {
      currentLevel: 7,
      currentElo: 1421,
      nextLevel: 8,
      nextLevelElo: 1550,
      progress: 68,
    },
    recentMatches: Array.from({ length: 10 }, (_, i) => ({
      id: `match-${i}`,
      map: ["Mirage", "Dust2", "Inferno", "Nuke", "Overpass"][Math.floor(Math.random() * 5)],
      result: Math.random() > 0.4 ? "W" : "L",
      score: `${Math.floor(Math.random() * 8) + 9}-${Math.floor(Math.random() * 8) + 5}`,
      kills: Math.floor(Math.random() * 15) + 10,
      deaths: Math.floor(Math.random() * 10) + 5,
      assists: Math.floor(Math.random() * 8),
      kd: (Math.random() * 1 + 0.5).toFixed(2),
      hs: Math.floor(Math.random() * 30) + 40,
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
    })),
    performanceRadar: [
      { subject: "K/D Ratio", A: 0.8, fullMark: 2 },
      { subject: "Headshots %", A: 0.7, fullMark: 1 },
      { subject: "Win Rate", A: 0.65, fullMark: 1 },
      { subject: "Avg Kills", A: 0.75, fullMark: 1 },
      { subject: "Clutches", A: 0.6, fullMark: 1 },
      { subject: "Opening Duels", A: 0.55, fullMark: 1 },
    ],
  }
}

export default function FaceitStats({ playerId }: { playerId: string }) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [matches, setMatches] = useState<Match[]>([])
  useEffect(() => {
    const loadData = async () => {
      try {
        const idFaceit = await getFaceitPlayerBySteam(playerId)
        const matchData = await getFaceit(idFaceit.player_id)
        setMatches(matchData.items)

        // let wins = 0;
        // matches.items.forEach((match:Match) => {
        //   const isPlayerInFaction1 = match.teams.faction1.players.some(
        //       (player:Player) => player.player_id === idFaceit
        //   );
        //   if ((isPlayerInFaction1 && match.results.winner === 'faction1') || (!isPlayerInFaction1 && match.results.winner === 'faction2')) {
        //     wins++;
        //   }
        //   return {
        //     id: match.match_id,
        //     date: new Date(match.started_at * 1000).toLocaleDateString(),
        //     result: (isPlayerInFaction1 && match.results.winner === 'faction1') || (!isPlayerInFaction1 && match.results.winner === 'faction2') ? 'W' : 'L',
        //     score: `${match.results.score.faction1}-${match.results.score.faction2}`
        //   };
        // })
      }catch(e) {
        console.log(e)
      }
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800))
      setStats(generateFaceitData(playerId))
      setLoading(false)
    }

    loadData()
  }, [playerId])

  if (loading) {
    return <div>Chargement des statistiques FACEIT...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div className="flex items-center gap-4">
          <Image
            src="/faceit_logo.webp"
            alt="FACEIT Logo"
            width={50}
            height={50}
            className="rounded-md"
          />
          <div>
            <h3 className="text-xl font-bold text-white">FACEIT</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
        
          <div className=" text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
            <img src={`/icons/xp/${stats.levelDistribution.currentLevel}.png`} alt="" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Progression ELO</CardTitle>
            <CardDescription>Évolution de votre ELO sur les 30 derniers matchs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.eloHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="match" stroke="#aaa" />
                <YAxis stroke="#aaa" domain={["dataMin - 100", "dataMax + 100"]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Line type="monotone" dataKey="elo" stroke="#ff5500" activeDot={{ r: 8 }} name="ELO" />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1 text-white">
                <span>
                  Niveau {stats.levelDistribution.currentLevel} ({stats.levelDistribution.currentElo})
                </span>
                <span>
                  Niveau {stats.levelDistribution.nextLevel} ({stats.levelDistribution.nextLevelElo})
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div
                  className="bg-orange-500 h-2.5 rounded-full"
                  style={{ width: `${stats.levelDistribution.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-center mt-2 text-white">
                {stats.levelDistribution.nextLevelElo - stats.levelDistribution.currentElo} points pour le niveau
                suivant
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Performance Radar</CardTitle>
            <CardDescription>Comparaison avec la moyenne des joueurs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats.performanceRadar}>
                <PolarGrid stroke="#444" />
                <PolarAngleAxis dataKey="subject" stroke="#aaa" />
                <PolarRadiusAxis angle={30} domain={[0, 1]} stroke="#aaa" />
                <Radar name="Joueur" dataKey="A" stroke="#ff5500" fill="#ff5500" fillOpacity={0.6} />
                <Legend />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Matchs Récents</CardTitle>
          <CardDescription>10 derniers matchs sur FACEIT</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4">Date</th>
                  
                  {/* <th className="text-left py-3 px-4">Résultat</th>
                  <th className="text-left py-3 px-4">Score</th>
                  <th className="text-left py-3 px-4">K</th>
                  <th className="text-left py-3 px-4">D</th>
                  <th className="text-left py-3 px-4">A</th>
                  <th className="text-left py-3 px-4">K/D</th>
                  <th className="text-left py-3 px-4">HS%</th> */}
                </tr>
              </thead>
              <tbody>

                {matches.slice(0, 10).map((match: Match) => (
                  <tr key={match.match_id} className="border-b border-slate-700 hover:bg-slate-700/50">
                    <td className="py-3 px-4">{new Date(match.started_at * 1000).toLocaleDateString()}</td>
                    
                   
                    {/* <td className="py-3 px-4">{match.score}</td>
                    <td className="py-3 px-4">{match.kills}</td>
                    <td className="py-3 px-4">{match.deaths}</td>
                    <td className="py-3 px-4">{match.assists}</td>
                    <td className="py-3 px-4">{match.kd}</td>
                    <td className="py-3 px-4">{match.hs}%</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

