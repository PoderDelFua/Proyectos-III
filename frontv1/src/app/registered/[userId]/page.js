"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import RegisteredNavbar from '@/components/RegisteredNavbar'
import RegisteredWelcomePage from '@/components/RegisteredWelcomePage'

const BACKEND_URL = "http://localhost:9000/api"

export default function UserPage() {
    const params = useParams()
    const [userData, setUserData] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            router.push('/')
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/usuario/${params.userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error('No se pudo cargar la información del usuario')
                }

                const data = await response.json()
                setUserData(data.data)
            } catch (error) {
                console.error("Error al cargar la información del usuario: ", error)
            }
        }

        fetchData()
    }, [params.userId]) 

    if (!userData) {
        return <div>Cargando...</div> 
    }

    return (
        <section>
            <RegisteredNavbar userId={params.userId} userEmail={userData.correo} />
            <RegisteredWelcomePage userId={params.userId} />
        </section>
    )
}
