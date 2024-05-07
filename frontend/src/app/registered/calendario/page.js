"use client"
import Sidebar from "@/components/Sidebar"
import Calendario from "@/components/calendario"
import DiaCalendario from "@/components/DiaCalendario"

export default function CalendarioPage(){
    return (
        <div className="flex h-full min-h-screen">
            <div className="w-64">
                <Sidebar/>
            </div>
            <div className="flex flex-col justify-around flex-1 bg-cyan-700 h-full min-h-screen px-7 py-3">
                <p className="text-3xl font-bold text-center">Calendario</p>
                <Calendario/>
            </div>
        </div>
    )
}