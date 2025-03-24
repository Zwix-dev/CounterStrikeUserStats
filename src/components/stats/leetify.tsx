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
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import type { AxisDomain } from "recharts/types/util/types"
import Image from "next/image"

// Simuler des données Leetify
const generateLeetifyData = (playerId: string) => {
  return {
    aimScore: {
      current: 78,
      history: Array.from({ length: 20 }, (_, i) => ({
        match: i + 1,
        score: 65 + Math.floor(Math.random() * 25),
      })),
    },
    utilityScore: {
      current: 62,
      history: Array.from({ length: 20 }, (_, i) => ({
        match: i + 1,
        score: 50 + Math.floor(Math.random() * 30),
      })),
    },
    positioningScore: {
      current: 71,
      history: Array.from({ length: 20 }, (_, i) => ({
        match: i + 1,
        score: 60 + Math.floor(Math.random() * 25),
      })),
    },
    clutchSuccess: {
      attempts: 42,
      won: 18,
      rate: 42.9,
      byPlayers: [
        { name: "1v1", won: 10, lost: 8 },
        { name: "1v2", won: 5, lost: 7 },
        { name: "1v3", won: 2, lost: 6 },
        { name: "1v4", won: 1, lost: 2 },
        { name: "1v5", won: 0, lost: 1 },
      ],
    },
    weaponAccuracy: [
      { name: "AK-47", accuracy: 28, headshot: 62 },
      { name: "M4A4", accuracy: 26, headshot: 58 },
      { name: "AWP", accuracy: 42, headshot: 85 },
      { name: "Desert Eagle", accuracy: 31, headshot: 72 },
      { name: "USP-S", accuracy: 29, headshot: 68 },
    ],
    impactRating: 1.24,
    flashAssists: 32,
    tradingSuccess: {
      tradeKills: 87,
      tradedDeaths: 64,
      ratio: 1.36,
    },
  }
}

const COLORS = ["#00C49F", "#FF8042"]

export default function LeetifyStats({ playerId }: { playerId: string }) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un chargement de données
    const loadData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800))
      setStats(generateLeetifyData(playerId))
      setLoading(false)
    }

    loadData()
  }, [playerId])

  if (loading) {
    return <div>Chargement des statistiques Leetify...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div className="flex items-center gap-4">
          <Image
            src="/icons/leetify_logo.jpeg"
            alt="Leetify Logo"
            width={50}
            height={50}
            className="rounded-md"
          />
          <div>
            <h3 className="text-xl font-bold text-white">Leetify</h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-sm text-slate-400">Impact Rating</p>
            <p className="text-2xl font-bold text-white">{stats.impactRating}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-400">Aim Score</p>
            <p className="text-2xl font-bold text-green-500">{stats.aimScore.current}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Aim Score</CardTitle>
            <CardDescription>Évolution de votre précision</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <span className="text-4xl font-bold text-green-500">{stats.aimScore.current}</span>
              <p className="text-slate-400">Score actuel</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={stats.aimScore.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="match" stroke="#aaa" />
                <YAxis stroke="#aaa" domain={[0, 100] as AxisDomain} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Line type="monotone" dataKey="score" stroke="#00C49F" activeDot={{ r: 8 }} name="Aim Score" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Utility Score</CardTitle>
            <CardDescription>Efficacité de vos grenades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <span className="text-4xl font-bold text-yellow-500">{stats.utilityScore.current}</span>
              <p className="text-slate-400">Score actuel</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={stats.utilityScore.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="match" stroke="#aaa" />
                <YAxis stroke="#aaa" domain={[0, 100] as AxisDomain} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Line type="monotone" dataKey="score" stroke="#FFBB28" activeDot={{ r: 8 }} name="Utility Score" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Positioning Score</CardTitle>
            <CardDescription>Qualité de vos placements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <span className="text-4xl font-bold text-blue-500">{stats.positioningScore.current}</span>
              <p className="text-slate-400">Score actuel</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={stats.positioningScore.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="match" stroke="#aaa" />
                <YAxis stroke="#aaa" domain={[0, 100] as AxisDomain} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Line type="monotone" dataKey="score" stroke="#0088FE" activeDot={{ r: 8 }} name="Positioning Score" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Précision par Arme</CardTitle>
            <CardDescription>Taux de précision et headshots</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.weaponAccuracy} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" domain={[0, 100] as AxisDomain} stroke="#aaa" />
                <YAxis dataKey="name" type="category" stroke="#aaa" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                  formatter={(value) => [`${value}%`, ""]}
                />
                <Legend />
                <Bar dataKey="accuracy" fill="#0088FE" name="Précision %" />
                <Bar dataKey="headshot" fill="#00C49F" name="Headshot %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Clutches</CardTitle>
            <CardDescription>Situations de clutch gagnées vs perdues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8 mb-4">
              <div className="text-center">
                <p className="text-sm text-slate-400">Taux de réussite</p>
                <p className="text-3xl font-bold text-white">{stats.clutchSuccess.rate}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">Clutches gagnés</p>
                <p className="text-3xl font-bold text-green-500">
                  {stats.clutchSuccess.won}/{stats.clutchSuccess.attempts}
                </p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.clutchSuccess.byPlayers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="won" stackId="a" fill="#00C49F" name="Gagnés" />
                <Bar dataKey="lost" stackId="a" fill="#FF8042" name="Perdus" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Trading</CardTitle>
          <CardDescription>Efficacité dans les échanges de frags</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm text-slate-400">Trade Ratio</p>
              <p className="text-4xl font-bold text-white">{stats.tradingSuccess.ratio}</p>
              <p className="text-sm text-slate-400 mt-2">
                {stats.tradingSuccess.tradeKills} kills / {stats.tradingSuccess.tradedDeaths} deaths
              </p>
            </div>

            <div className="md:col-span-2">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Trade Kills", value: stats.tradingSuccess.tradeKills },
                      { name: "Traded Deaths", value: stats.tradingSuccess.tradedDeaths },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {COLORS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

