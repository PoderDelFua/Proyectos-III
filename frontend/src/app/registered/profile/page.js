"use client"

import Sidebar from '@/components/Sidebar'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {BACKEND_URI} from '@/config/env'
import { PencilIcon } from '@heroicons/react/24/solid';


export default function UserProfile() {
    const router = useRouter()
    const [userData, setUserData] = useState(null)
    const [nombre, setNombre] = useState('')
    const [instrumento, setInstrumento] = useState([])
    const [gustoMusical, setGustoMusical] = useState([])
    const [bio, setBio] = useState('')
    const [nickname, setNickname] = useState('')


    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.push('/login')
            return
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URI}/usuario/getUserData`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                if (!response.ok) {
                    localStorage.removeItem('token')
                    throw new Error('No se pudo cargar la información del usuario')
                    router.push('/login')
                }
                console.log("Buscando datos del usuario...")
                const data = await response.json()
                console.log(`Data (profile page): ${data.data}`)
                setUserData(data.data)
            } catch (error) {
                console.error("Error al cargar la información del usuario: ", error)
            }
        }

        fetchData()
    }, [])
    useEffect(() => {
        if (userData) {
            setNombre(userData.nombre)
            setInstrumento([...userData.instrumento])
            setGustoMusical(userData.gusto_musical)
            setBio(userData.bio)
            setNickname(userData.nickname)
        }
    }, [userData])
    if (!userData) {
        return <div>Cargando...</div>
    }

    return (
        <div className="flex min-h-screen">
            <div className="w-48">
                <Sidebar selectedTab="profile"/>
            </div>
            <div className="flex flex-1 flex-col min-h-screen bg-white">
              <div className="relative">
                <img src="/fondo-login.png" alt="Background" className="w-full h-48 object-cover" />
                <div className="absolute pl-20 top-32 left-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                      <img src="/no-profile.png" alt="Profile" />
                  </div>
                </div>
              </div>
              
              <div className="px-8 py-6 pl-32 mt-16">
                <Link href="/registered/modify" 
                      className="absolute top-48 right-4 mt-8 mr-8 px-4 py-2 bg-white text-gray-800 border border-gray-400 rounded-xl flex items-center space-x-2">
                    <PencilIcon className="h-4 w-4" />
                    <span>Editar perfil</span>
                </Link>
                <h2 className="text-2xl font-bold">{nombre}</h2>
                <p className="text-gray-600">@{nickname}</p>
                <p className="mt-4">{bio}</p>
                
                <div className="mt-4">
                    <span className="font-bold">Instrumentos:</span>
                    {instrumento.map((item, index) => (
                      <span key={index} className="ml-2">
                        {item.nombre} ({item.nivel})
                      </span>
                    ))}
                </div>
                
                <div className="mt-8 grid grid-cols-4 gap-4">
                  <Link href="#">
                    <h3 className="font-bold">Publicaciones</h3>
                  </Link>
                  <Link href="#">
                    <h3 className="font-bold">Respuestas</h3>
                  </Link>
                  <Link href="#">
                    <h3 className="font-bold">Actividades</h3>
                  </Link>
                  <Link href="#">
                    <h3 className="font-bold">Favoritos</h3>
                  </Link>
                </div>
              </div>
            </div>
        </div>
    )
}