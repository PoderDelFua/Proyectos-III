"use client"

import { useRouter } from 'next/navigation'
import {useState, useEffect} from 'react'
import {BACKEND_URI} from "@/config/env";
import ActivityInfo from './ActivityInfo';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
export default function PageCard({ page, foto }) {
    const router = useRouter();
    const token = localStorage.getItem('token')
    const [userData, setUserData] = useState(null)
    const [creatorData, setCreatorData] = useState(null)
    const [participants, setParticipants] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [confetti, setConfetti] = useState(false);
    const { width, height } = useWindowSize();

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
                setFavorite(data.data.favoritos.includes(page._id));

                const response2 = await fetch(`${BACKEND_URI}/usuario/getUsersData/${page.creadoPor}`, {
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

                const participantsIds = page.usuarios
                const participantsPromises = participantsIds.map(async (id) => {
                    const response3 = await fetch(`${BACKEND_URI}/usuario/getUsersData/${id._id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    })
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
    }, []);

    const handleButton = (e) => {
        //Llamada al back para añadir el usuario a la actividad
        if (token === null) {
            router.push('/login')
        } else {
            const fetchData = async () => {
                try {
                    const data = userData
                    //Comprobamos si el usuario ya está unido a la actividad
                    if (data.actividades.includes(page._id)) {
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
                            userId: data._id,
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
                                userId: data._id,
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

    const handleDeleteFavorito = (e) => {
        setFavorite(!favorite)
        if (token === null) {
            router.push('/login')
        } else {
            const fetchData = async () => {
                try {
                    const data = userData
                    //Comprobamos si el usuario ya está unido a la actividad
                    if (!data.favoritos.includes(page._id)) {
                        setFavorite(false)
                        return
                    }
                    console.log("Buscando datos del usuario...")
                    //Ahora que tenemos los datos del usuario, podemos hacer la llamada para unirlo a la actividad
                    const response2 = await fetch(`${BACKEND_URI}/usuario/removeFavoritos/${page._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            userId: data._id,
                            pageId: page._id
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
            setFavorite(true); // Marca como favorito
            setConfetti(true); // Activa confeti
            setTimeout(() => setConfetti(false), 2000);
                if (token === null) {
                    router.push('/login')
                } else {
                    const fetchData = async () => {
                        try {
                            const data = userData
                            //Comprobamos si el usuario ya está unido a la actividad
                            if (data.favoritos.includes(page._id)) {
                                //Le cambiamos el color al botón a blanco
                                setFavorite(false)
                                return
                            }
                            //Ahora que tenemos los datos del usuario, podemos hacer la llamada para unirlo a la actividad
                            const response3 = await fetch(`${BACKEND_URI}/usuario/addFavoritos/${page._id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`,
                                },
                                body: JSON.stringify({
                                    userId: data._id,
                                    pageId: page._id
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
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            {showNotification && (
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg text-lg font-semibold transition-opacity duration-300 ease-in-out">
                    {notificationMessage}
                </div>
            )}
            <div className="relative">
                {confetti && <Confetti width={width} height={height}/>}
                <img src={foto} alt="Imagen de la actividad" className="h-56 w-full object-cover"/>
                <button onClick={buttonFavorito}
                        className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer bg-white rounded-full p-2">
                    {favorite ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-star" viewBox="0 0 16 16">
                            <path
                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                        </svg>
                    )}
                </button>

            </div>
            <div className="max-w-sm p-6 flex flex-col justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{page.nombre}</h5> {/* Cambiado a 'nombre' */}
                <p className="mb-4 font-normal text-gray-700">{page.descripcion}</p> {/* Cambiado a 'descripcion' */}
                <div className="flex items-center space-x-4">
                    <button onClick={openInfo} type="button"
                            className="cursor-pointer transition-all bg-indigo-600 text-white px-6 py-2 rounded-lg border-indigo-700 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                        Ver más información
                    </button>
                    {isExpanded && (
                        <ActivityInfo isOpen={isExpanded}
                                      onClose={closeInfo}
                                      page={page}
                                      foto={foto}
                                      nickname={creatorData ? creatorData.nickname : 'nickname'}
                                      handleUnirse={handleButton}
                                      users={participants}/>
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

