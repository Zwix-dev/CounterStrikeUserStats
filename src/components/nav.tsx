"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { createAuthClient } from "better-auth/react"
const { useSession } = createAuthClient() 
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {
        data: session
    } = useSession()
    const router = useRouter()
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleLogout = async () => {
        await authClient.signOut();
        router.refresh();
        setIsMenuOpen(false)
    }

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">

                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <span className="text-xl font-bold text-purple-500">User</span>
                            <span className="text-xl font-semibold text-gray-800">Finder</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-gray-700 hover:bg-purple-100 p-2 rounded-lg font-medium">
                            Home
                        </Link>
                        <Link href="/features" className="text-gray-700 hover:bg-purple-100 p-2 rounded-lg font-medium">
                            Features
                        </Link>
                        <Link href="/pricing" className="text-gray-700 hover:bg-purple-100 p-2 rounded-lg font-medium">
                            Pricing
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:bg-purple-100 p-2 rounded-lg font-medium">
                            About
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {session?.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
                                        <Avatar>
                                            <AvatarFallback className="bg-purple-100 text-purple-700">{session.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Link href="/profile" className="w-full">
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/settings" className="w-full">
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {
                                        handleLogout()
                                    }}
                                    >Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Link href="/auth/login">
                                    <Button variant="ghost" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                                        Login
                                    </Button>
                                </Link>

                                <Link href="/auth/register">
                                    <Button className="bg-purple-600 text-white hover:bg-purple-700">
                                        Sign Up
                                    </Button>
                                </Link>

                            </>
                        )}
                    </div>


                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-gray-700 hover:text-purple-600 focus:outline-none">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-2 border-t border-gray-100">
                        <Link
                            href="/"
                            className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/features"
                            className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="/pricing"
                            className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/about"
                            className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>

                        <div className="pt-4 border-t border-gray-100">
                            {session?.user ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-md"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-md"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-md"
                                        onClick={() => {

                                            handleLogout()
                                        }}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col space-y-2 px-4">
                                    <Button
                                        variant="outline"
                                        className="border-gray-300 text-gray-700 hover:bg-purple-50 hover:text-purple-600 w-full justify-center"
                                        onClick={() => {

                                            setIsMenuOpen(false)
                                        }}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        className="bg-purple-600 text-white hover:bg-purple-700 w-full justify-center"
                                        onClick={() => {

                                            setIsMenuOpen(false)
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav >
    )
}

