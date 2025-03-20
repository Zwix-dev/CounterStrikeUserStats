"use client"
import { Crosshair } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useRef } from "react";

export default function InputSearch() {

    return (
        <div className="relative w-full max-w-md">
            <input type="text" placeholder="SteamUrl" className="w-full py-3 pl-3 pr-4 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white rounded-lg">
                <Button className="hover:bg-gray-800 hover:cursor-pointer">
                    <Crosshair />
                </Button>

            </div>
        </div>
    )
}