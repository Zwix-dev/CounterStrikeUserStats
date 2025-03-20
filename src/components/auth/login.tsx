"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client";
export function LoginForm() {
    const [error, setError] = useState("");
    const router = useRouter();
    async function onSubmit(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const response = await authClient.signIn.email({
                /**
                 * The user email
                 */
                email,
                /**
                 * The user password
                 */
                password,
                /**
                 * a url to redirect to after the user verifies their email (optional)
                 */
                callbackURL: "/",
                /**
                 * remember the user session after the browser is closed. 
                 * @default true
                 */
                rememberMe: false
            }, {
                //callbacks
            })
            if (!!response?.error) {
                alert(response?.error.message)
        
            } else {
                
                router.push("/")
            }
        } catch (e) {

            setError("E-mail ou mot de passe incorrect");
        }

    }
    return (
        <Card className="mx-auto w-96">
            <form onSubmit={onSubmit}>
                <CardHeader>
                    <CardTitle className="text-2xl dark:text-white">Login</CardTitle>
                    <CardDescription>
                        Entrez votre email ci-dessous pour vous connecter.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Mot-de-passe</Label>
                                
                            </div>
                            <Input id="password" name="password" type="password" required />
                            {/* <div className="flex flex-row gap-4">
                                <Button variant="outline" className="w-full" onClick={() => signIn('google')}>
                                    <FaGoogle />
                                </Button>
                                <Button variant="outline" className="w-full" onClick={() => signIn('github')}>
                                    <FaGithub />
                                </Button>
                            </div> */}
                            <Link href="/auth/pass-reset" className="ml-auto inline-block text-sm underline">
                                    Mot-de-passe oublié ?
                                </Link>
                        </div>
                        <Button type="submit" className="w-full ">
                            Login
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </form>
        </Card>
    )
}
