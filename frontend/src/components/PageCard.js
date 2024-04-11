"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {BACKEND_URI} from "@/config/env";
import ActivityInfo from './ActivityInfo';

export default function PageCard({ page, userId, userName ,foto }) {
    const router = useRouter();
    const token = localStorage.getItem('token')
    const [userData, setUserData] = useState(null)
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

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
                    //Comprobamos si el usuario ya está unido a la actividad
                    if (data.data.actividades.includes(page._id)) {
                        setNotificationMessage('Ya estás unido a esta actividad');
                        setShowNotification(true);
                        setTimeout(() => {
                            setShowNotification(false);
                        }, 3000); // Oculta la notificación a los 3 segundos
                        return
                    }
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
                    if(!response2.ok){
                        throw new Error('No se pudo unir al usuario a la actividad')
                    }else{
                        const response3 = await fetch(`${BACKEND_URI}/usuario/updateActivityData`, {
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
                        if(!response3.ok){
                            throw new Error('No se pudo actualizar la información del usuario')
                        }
                        //Comprobamos si el usuario ya está unido a la actividad
                        if (userData.actividades.includes(page._id)) {
                            setNotificationMessage('Ya estás unido a esta actividad');
                            setShowNotification(true);
                            setTimeout(() => {
                                setShowNotification(false);
                            }, 3000); // Oculta la notificación a los 3 segundos
                            return
                        }


                        // Actualiza el estado para mostrar la notificación
                        setNotificationMessage('Usuario unido a la actividad ✔');
                        setShowNotification(true);
                        setTimeout(() => {
                            setShowNotification(false);
                        }, 3000); // Oculta la notificación a los 3 segundos

                    }


                } catch (error) {
                    console.error("Error al cargar la información del usuario: ", error)
                }
            }
            fetchData()
        }
    }

    const openInfo = (e) => {
        setIsExpanded(true)
    }

    const closeInfo = (e) => {
        setIsExpanded(false)
    }

    return (
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            {showNotification && (
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg text-lg font-semibold transition-opacity duration-300 ease-in-out">
                    {notificationMessage}
                </div>
            )}
            <img src={foto} alt="Imagen de la actividad" className="h-56 w-full object-cover" />
            <div className="max-w-sm p-6 flex flex-col justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{page.nombre}</h5> {/* Cambiado a 'nombre' */}
                <p className="mb-4 font-normal text-gray-700">{page.descripcion}</p> {/* Cambiado a 'descripcion' */}
                <div className="flex items-center space-x-4">
                    <button onClick={openInfo} type="button"
                            className="cursor-pointer transition-all bg-indigo-600 text-white px-6 py-2 rounded-lg border-indigo-700 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                        Ver más información
                    </button>
                    {isExpanded && (
                        <ActivityInfo isOpen={isExpanded} onClose={closeInfo} page={page} foto={foto} />
                    )}
                    {token !== null && (
                        <button onClick={handleButton} type="button"
                                className="cursor-pointer transition-all bg-indigo-600 text-white px-6 py-2 rounded-lg border-indigo-700 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                            Unirse
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

