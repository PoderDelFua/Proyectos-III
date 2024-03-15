"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {BACKEND_URI} from "@/config/env";

export default function PageCard({ page, userId, userName }) {
    const router = useRouter();
    const token = localStorage.getItem('token')
    const [userData, setUserData] = useState(null)

    const handleButton = (e) => {
        //Llamada al back para añadir el usuario a la actividad
        if (token === null) {
            router.push('/login')
        } else {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${BACKEND_URI}/usuario/getUserData`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                    if (!response.ok) {
                        throw new Error('No se pudo cargar la información del usuario')
                    }
                    console.log("Buscando datos del usuario...")
                    const data = await response.json()
                    setUserData(data.data)
                    //Ahora que tenemos los datos del usuario, podemos hacer la llamada para unirlo a la actividad
                    const response2 = await fetch(`${BACKEND_URI}/actividades/addUserToActivity`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            userId: data.data._id,
                            pageId: page._id
                        })
                    })

                } catch (error) {
                    console.error("Error al cargar la información del usuario: ", error)
                }
            }
            fetchData()
        }
    }


    const handeInfo = (e) => {
        alert("No implementado")
    }

    return (
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img src="bg.jpg" alt="Activity" className="object-cover w-full h-32" />
            <div className="max-w-sm p-6 flex flex-col justify-between flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{page.nombre}</h5> {/* Cambiado a 'nombre' */}
                <p className="mb-3 font-normal text-gray-700">{page.descripcion}</p> {/* Cambiado a 'descripcion' */}
                <div className="flex items-center space-x-4">
                    <button onClick={handeInfo} type="button" className="text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Ver más información
                    </button>
                    {token !== null && (
                        <button onClick={handleButton} type="button" className="text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Unirse
                    </button>
                    )}
                </div>
            </div>
        </div>
    )
}

