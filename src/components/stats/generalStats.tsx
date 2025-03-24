"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import type { AxisDomain } from "recharts/types/util/types"

// Simuler des données pour les statistiques générales
const generateMockData = (playerId: string) => {
  // Dans une application réelle, ces données viendraient d'une API
  return {
    weaponStats: [
      { name: "AK-47", kills: 1245, headshots: 782, accuracy: 28 },
      { name: "M4A4", kills: 987, headshots: 543, accuracy: 26 },
      { name: "AWP", kills: 654, headshots: 432, accuracy: 42 },
      { name: "Desert Eagle", kills: 432, headshots: 321, accuracy: 31 },
      { name: "USP-S", kills: 321, headshots: 234, accuracy: 29 },
    ],
    mapStats: [
      { name: "Mirage", matches: 78, winRate: 62 },
      { name: "Dust2", matches: 65, winRate: 58 },
      { name: "Inferno", matches: 54, winRate: 52 },
      { name: "Nuke", matches: 32, winRate: 47 },
      { name: "Overpass", matches: 28, winRate: 61 },
    ],
    performanceHistory: Array.from({ length: 20 }, (_, i) => ({
      match: i + 1,
      kills: Math.floor(Math.random() * 15) + 10,
      deaths: Math.floor(Math.random() * 10) + 5,
      kd: (Math.random() * 1 + 0.5).toFixed(2),
    })),
    roleDistribution: [
      { name: "Entry Fragger", value: 35 },
      { name: "Support", value: 25 },
      { name: "AWPer", value: 15 },
      { name: "Lurker", value: 15 },
      { name: "IGL", value: 10 },
    ],
  }
}

const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"]

export default function PlayerStats({ playerId }: { playerId: string }) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un chargement de données
    const loadData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800))
      setStats(generateMockData(playerId))
      setLoading(false)
    }

    loadData()
  }, [playerId])

  if (loading) {
    return <div>Chargement des statistiques...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Armes Préférées</CardTitle>
          <CardDescription>Statistiques par arme</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.weaponStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
              />
              <Bar dataKey="kills" fill="#8884d8" name="Kills" />
              <Bar dataKey="headshots" fill="#82ca9d" name="Headshots" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Distribution des Rôles</CardTitle>
          <CardDescription>Style de jeu préféré</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.roleDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {stats.roleDistribution.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Performance Récente</CardTitle>
          <CardDescription>20 derniers matchs</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.performanceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="match" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
              />
              <Line type="monotone" dataKey="kills" stroke="#8884d8" activeDot={{ r: 8 }} name="Kills" />
              <Line type="monotone" dataKey="deaths" stroke="#ff8042" name="Deaths" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Statistiques par Map</CardTitle>
          <CardDescription>Taux de victoire par carte</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.mapStats} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis type="number" domain={[0, 100] as AxisDomain} stroke="#aaa" />
              <YAxis dataKey="name" type="category" stroke="#aaa" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
                formatter={(value) => [`${value}%`, "Win Rate"]}
              />
              <Bar dataKey="winRate" fill="#82ca9d" name="Win Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

