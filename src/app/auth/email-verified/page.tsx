"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Mail, XCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EmailVerifiedPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const error = searchParams.get("error")

  const handleResendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await authClient.sendVerificationEmail({
        email: email
      })
      alert("Email de vérification envoyé !")
      setEmail("")
    } catch (error) {
      alert("Erreur lors de l'envoi de l'email")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (

   
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {error ?
              <XCircle className="w-12 h-12 text-red-500" /> :
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            }
          </div>
          <CardTitle>{error ? "Échec de la vérification" : "Email Vérifié !"}</CardTitle>
          <CardDescription>
            {error ?
              "La vérification a échoué. Vous pouvez réessayer en saisissant votre email ci-dessous." :
              "Votre adresse email a été vérifiée avec succès."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <form onSubmit={handleResendEmail} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}

                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex gap-2 items-center justify-center"
              >
                <Mail className="w-4 h-4" />
                {isLoading ? "Envoi en cours..." : "Renvoyer l'email de vérification"}
              </Button>
            </form>
          ) : (
            <Button
              onClick={() => router.push("/auth/login")}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              Aller à la connexion
            </Button>
          )}
        </CardContent>
      </Card>
  

  )
}