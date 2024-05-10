"use client"

import Sidebar from "@/components/Sidebar"
import Calendario from "@/components/calendario"

export default function CalendarioPage(){
    return (
        <div className="flex h-full min-h-screen ">
            <div className="w-64">
                <Sidebar selectedTab={"calendar"}/>
            </div>
            <div className="flex flex-col  flex-1 h-full min-h-screen px-7 py-3">
                <p className="text-3xl font-bold text-center">Calendario</p>
                <Calendario/>
            </div>
        </div>
    )
}