"use client"

import SidebarForo from '@/components/SidebarForo';
import { useState, useEffect } from 'react';
import { BACKEND_URI } from '@/config/env';
import { useRouter } from 'next/navigation';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

export default function HiloDetallePage() {
    const router = useRouter();
    const [hilo, setHilo] = useState(null);
    const [mensajes, setMensajes] = useState([]);
    const [newMessage, setNewMessage] = useState('')
    const [likes, setLikes] = useState({});
    const [creadoPor, setCreadoPor] = useState('');
    const [selectedTab, setSelectedTab] = useState('')
    const [like, setLike] = useState(false);


    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setCreadoPor(userId);
        }
    }, []);
    useEffect(() => {
        if (hilo) {
            localStorage.setItem('selectedTab', hilo.titulo); // Guardar el título del hilo actual en el almacenamiento local
        }
    }, [hilo]);


    useEffect(() => {
        const hiloId = localStorage.getItem('currentHiloId');
        const fetchHiloAndMensajes = async () => {
            try {
                const hiloResponse = await fetch(`${BACKEND_URI}/hilo/getHiloById/${hiloId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const hiloData = await hiloResponse.json();
                setSelectedTab(hiloData.titulo)
                setHilo(hiloData);

                const mensajesResponse = await fetch(`${BACKEND_URI}/hilo/getMsgHilo/${hiloId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const mensajesData = await mensajesResponse.json();
                setMensajes(mensajesData);
                // Inicializar likes para cada mensaje
                const initialLikes = {};
                mensajesData.forEach(msg => {
                    initialLikes[msg._id] = msg.likes;
                });
                setLikes(initialLikes);
            } catch (error) {
                console.error("Error al cargar los detalles y mensajes del hilo: ", error);
            }
        };

        if (hiloId) {
            fetchHiloAndMensajes();
        }
    }, []);

    
    const handleSendMessage = async () => {
        const token = localStorage.getItem('token');
        const hiloId = localStorage.getItem('currentHiloId');
        if (newMessage.trim() !== '') {
            setNewMessage(newMessage.trim())
            try {
                const body = JSON.stringify({
                    autorMensaje: creadoPor,
                    mensaje: newMessage,
                    hiloId: hiloId,
                    likes: 0,
                    padreMensaje: hilo._id,
                    mediaId: "65f22f0800c7c18e6fa74aaa",
                })

                const response = await fetch(`${BACKEND_URI}/mensajes/crearPost`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: body,
                })
                console.log("Enviando mensaje...", body)

                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                setNewMessage('')
                window.location.reload();
            } catch (error) {
                console.error("Error al enviar el mensaje: ", error)
            }
        }
    }
    const handleLike = async (mensajeId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BACKEND_URI}/mensajes/likeMsg/${mensajeId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedLikes = {
                    ...likes,
                    [mensajeId]: likes[mensajeId] ? likes[mensajeId] + 1 : 1
                };
                setLikes(updatedLikes);
            } else {
                throw new Error('Failed to like the message');
            }
        } catch (error) {
            console.error("Error al dar like al mensaje: ", error);
        }
    };

    return (
        <section className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/6">
                <SidebarForo selectedTab={hilo ? hilo.titulo : ''}/>
            </div>

            <div className="w-full md:w-2/3 mr-20 mb-32">
                {hilo && (
                    <div className="relative mt-4">
                        <div className="relative p-8 bg-white rounded-lg shadow shadow-md overflow-hidden border-2 border-blue mb-4">
                            <div className="flex items-center" style={{flexWrap: 'wrap'}}> {}
                                <div className="flex flex-col items-center"
                                     style={{flexShrink: 0}}> {}
                                    <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
                                        <img src="/no-profile.png" alt="Profile"
                                             className="w-full h-full object-cover"/>
                                    </div>
                                    <p className="text-gray-600 text-sm">@{hilo.creadorId.nickname}</p>
                                </div>
                                <div className="ml-4"
                                     style={{maxWidth: 'calc(100% - 5rem)', flexBasis: 'auto'}}> {}
                                    <h1 className="font-bold text-xl truncate">{hilo.titulo}</h1>
                                    <h3 className="text-lg mt-4 truncate">{hilo.descripcion}</h3>
                                </div>
                            </div>
                            <p className="absolute bottom-0 right-0 mb-2 mt-2 mr-8 cursor-pointer">{hilo.postCount}</p>
                            <button
                                onClick={() => setLike(!like)}
                                className="absolute bottom-0 right-0 mb-2 mt-2 mr-2 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    fill="#0065EF"
                                    className="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                </svg>
                            </button>
                            <p className="absolute bottom-0 right-0 mb-2 mt-4 mr-28 cursor-pointer">{hilo.postCount}</p>
                            <button
                                onClick={() => setLike(!like)}
                                className="absolute bottom-0 right-0 mb-2 mt-2 mr-20 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0065EF"
                                     className="bi bi-chat-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-4">
                            {mensajes.map((mensaje) => (
                                <div key={mensaje._id} className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#64ABFF"
                                         className="bi bi-arrow-return-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                              d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5"/>
                                    </svg>
                                    <div className="p-4 rounded-lg flex items-center ml-8 custom-bg-color2">
                                        <div className="flex flex-col items-center" style={{flexShrink: 0}}> {}
                                            <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
                                                <img src="/no-profile.png" alt="Profile"
                                                     className="w-full h-full object-cover"/>
                                            </div>
                                            <p className="text-gray-600 text-sm">@{mensaje.autorMensaje.nickname}</p>
                                        </div>
                                        <div className="ml-4" style={{maxWidth: 'calc(100% - 5rem)', flexBasis: 'auto'}}> {}
                                            <p className="text-gray-800">{mensaje.mensaje}</p>
                                        </div>
                                        {/* Mostrar el número de likes desde el estado actualizado */}
                                        <p className="absolute bottom-0 right-0 mb-2 mt-2 mr-10">{likes[mensaje._id] || mensaje.likes}</p>
                                        <button onClick={() => handleLike(mensaje._id)} className="absolute bottom-0 right-0 mb-2 mt-2 mr-2 cursor-pointer">  
                                            {likes[mensaje._id] ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0065EF" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0065EF" className="bi bi-heart" viewBox="0 0 16 16">
                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-white p-4 flex fixed bottom-0 md:w-2/3 mb-4 justify-center">
                                <input
                                    type="text"
                                    className="input-custom"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button className="ml-5 focus:outline-none" onClick={handleSendMessage}>
                                    <PaperAirplaneIcon
                                        className="h-12 w-12 custom-bg-color rounded-full p-2 cursor-pointer transition-colors duration-200 color-icon"/>
                                </button>
                                
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </section>
    );
}