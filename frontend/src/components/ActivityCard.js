"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { BACKEND_URI } from "@/config/env"
import ActivityInfo from './ActivityInfo'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid'
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline'
import { CalendarDaysIcon } from '@heroicons/react/24/solid'


export default function ActivityCard({ activity, foto }) {
    const router = useRouter()
    const token = localStorage.getItem('token')
    const [userData, setUserData] = useState(null)
    const [creatorData, setCreatorData] = useState(null)
    const [participants, setParticipants] = useState([])
    const [showNotification, setShowNotification] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [confetti, setConfetti] = useState(false)
    const { width, height } = useWindowSize()

    useEffect(() => {
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
                setFavorite(data.data.favoritos.includes(activity._id))
                const response2 = await fetch(`${BACKEND_URI}/usuario/getUsersData/${activity.creadoPor}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                if (!response2.ok) {
                    throw new Error('No se pudo cargar la información del creador de la actividad')
                }
                const data2 = await response2.json()
                setCreatorData(data2.data)

                const participantsIds = activity.usuarios
                const participantsPromises = participantsIds.map(async (id) => {
                    const response3 = await fetch(`${BACKEND_URI}/usuario/getUsersData/${id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                    console.log(response3)
                    if (!response3.ok) {
                        throw new Error('No se pudo cargar la información del participante')
                    }
                    const data3 = await response3.json()
                    return data3.data
                })
                const participantsData = await Promise.all(participantsPromises)
                setParticipants(participantsData)

            } catch (error) {
                console.error("Error al cargar la información del usuario: ", error)
            }
        }

        fetchData()
    }, [])

    const handleButton = (e) => {
        //Llamada al back para añadir el usuario a la actividad
        if (token === null) {
            router.push('/login')
        } else {
            const fetchData = async () => {
                try {
                    const data = userData
                    //Comprobamos si el usuario ya está unido a la actividad
                    if (data.actividades.includes(activity._id)) {
                        setNotificationMessage('Ya estás unido a esta actividad')
                        setShowNotification(true)
                        setTimeout(() => {
                            setShowNotification(false)
                        }, 3000) // Oculta la notificación a los 3 segundos
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
                            userId: data._id,
                            pageId: activity._id
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
                                userId: data._id,
                                pageId: activity._id
                            })
                        })
                        if(!response3.ok){
                            throw new Error('No se pudo actualizar la información del usuario')
                        }
                        //Comprobamos si el usuario ya está unido a la actividad
                        if (userData.actividades.includes(activity._id)) {
                            setNotificationMessage('Ya estás unido a esta actividad')
                            setShowNotification(true)
                            setTimeout(() => {
                                setShowNotification(false)
                            }, 3000) // Oculta la notificación a los 3 segundos
                            return
                        }


                        // Actualiza el estado para mostrar la notificación
                        setNotificationMessage('Usuario unido a la actividad ✔')
                        setShowNotification(true)
                        setTimeout(() => {
                            setShowNotification(false)
                        }, 3000) // Oculta la notificación a los 3 segundos

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

    const handleDeleteFavorito = (e) => {
        setFavorite(!favorite)
        if (token === null) {
            router.push('/login')
        } else {
            const fetchData = async () => {
                try {
                    const data = userData
                    //Comprobamos si el usuario ya está unido a la actividad
                    if (!data.favoritos.includes(activity._id)) {
                        setFavorite(false)
                        return
                    }
                    console.log("Buscando datos del usuario...")
                    //Ahora que tenemos los datos del usuario, podemos hacer la llamada para unirlo a la actividad
                    const response2 = await fetch(`${BACKEND_URI}/usuario/removeFavoritos/${activity._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            userId: data._id,
                            pageId: activity._id
                        })
                    })
                    console.log(response2)
                    if (!response2.ok) {
                        throw new Error('No se pudo unir al usuario a la actividad')
                    }
                } catch (error) {
                    console.error("Error al cargar la información del usuario: ", error)
                }
            }
            fetchData()
        }
    }
    const handleFavorito = (e) => {
        if (!favorite) { // Solo actualiza si actualmente no es favorito
            setFavorite(true) // Marca como favorito
            setConfetti(true) // Activa confeti
            setTimeout(() => setConfetti(false), 2000)
                if (token === null) {
                    router.push('/login')
                } else {
                    const fetchData = async () => {
                        try {
                            const data = userData
                            //Comprobamos si el usuario ya está unido a la actividad
                            if (data.favoritos.includes(activity._id)) {
                                //Le cambiamos el color al botón a blanco
                                setFavorite(false)
                                return
                            }
                            //Ahora que tenemos los datos del usuario, podemos hacer la llamada para unirlo a la actividad
                            const response3 = await fetch(`${BACKEND_URI}/usuario/addFavoritos/${activity._id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`,
                                },
                                body: JSON.stringify({
                                    userId: data._id,
                                    pageId: activity._id
                                })
                            })
                            if (!response3.ok) {
                                throw new Error('No se pudo unir a favorito')
                            }

                        } catch (error) {
                            console.error("Error al cargar la información del usuario: ", error)
                        }
                    }
                    fetchData()
                }
            }
        }
            const buttonFavorito = (e) => {
                if (favorite === false) {
                    handleFavorito()
                    setFavorite(true)
                } else {
                    handleDeleteFavorito()
                    setFavorite(false)
                }
            }

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue">
            {showNotification && (
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg text-lg font-semibold transition-opacity duration-300 ease-in-out">
                    {notificationMessage}
                </div>
            )}
            <div onClick={openInfo} className="cursor-pointer">
                <div className="relative">
                    {confetti && <Confetti width={width} height={height} />}
                    <img src={foto} alt="Imagen de la actividad" className="w-full object-cover rounded-t-lg p-4" />
                </div>
                <div className="p-6">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{activity.nombre}</h5>
                    <p className="text-sm text-gray-500">Creado por @{creatorData ? creatorData.nickname : 'nickname'}</p>
                    <p className="mb-4 text-gray-700">{activity.descripcion}</p>
                    <div className="flex justify-between items-center">
                        {activity.horarios && (
                            <div className="flex items-center space-x-2">
                                <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
                                <p className="text-gray-500">{activity.horarios}</p>
                            </div>
                        )}
                        <div className="flex space-x-4 items-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    buttonFavorito()
                                }}
                                className="cursor-pointer bg-light-blue rounded-lg p-2"
                            >
                                {favorite ? (
                                    <BookmarkIconSolid className="h-7 w-7 text-blue" />
                                ) : (
                                    <BookmarkIconOutline className="h-7 w-7 text-blue" />
                                )}
                            </button>
                            {token !== null && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleButton()
                                    }}
                                    type="button"
                                    className="cursor-pointer transition-all bg-blue text-white px-6 py-2 rounded-lg border-dark-blue border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                                >
                                    Unirse
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isExpanded && (
                <ActivityInfo
                    isOpen={isExpanded}
                    onClose={closeInfo}
                    userId={userData._id}
                    activity={activity}
                    foto={foto}
                    nickname={creatorData ? creatorData.nickname : 'nickname'}
                    handleUnirse={handleButton}
                    users={participants}
                />
            )}
        </div>
    )
}
