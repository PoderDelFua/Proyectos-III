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
    const [like, setLike] = useState(false);
    const [creadoPor, setCreadoPor] = useState('');
    const [selectedTab, setSelectedTab] = useState('')


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
                if (!hiloResponse.ok) {
                    throw new Error('No se pudo cargar la información del hilo');
                }
                const hiloData = await hiloResponse.json();
                console.log("Hilodata", hiloData);
                setSelectedTab(hiloData.titulo)
                setHilo(hiloData);

                const mensajesResponse = await fetch(`${BACKEND_URI}/hilo/getMsgHilo/${hiloId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!mensajesResponse.ok) {
                    throw new Error('No se pudo cargar la información de los mensajes');
                }
                const mensajesData = await mensajesResponse.json();
                setMensajes(mensajesData);
            } catch (error) {
                console.error("Error al cargar los detalles y mensajes del hilo: ", error);
            }
        };

        if (hiloId) {
            fetchHiloAndMensajes();
        }
    }, []);
    // No fuciona el crear una respuesta
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

    return (
        <section className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/6">
                <SidebarForo selectedTab={selectedTab} />
            </div>

            <div className="w-full md:w-2/3 mr-20 mb-4">
                {hilo && (
                    <div className="relative mt-4">
                        <div className="bg-primary-gray p-8 rounded-lg shadow mb-4">
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
                            
                        </div>
                        <div className="space-y-4">
                            {mensajes.map((mensaje) => (
                                <div key={mensaje._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gray" className="bi bi-arrow-return-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5"/>
                                    </svg>
                                    <div className="bg-gray-50 p-4 rounded-lg shadow flex items-center ml-8">    
                                        <div className="flex flex-col items-center" style={{flexShrink: 0}}> {}
                                            <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
                                                <img src="/no-profile.png" alt="Profile" className="w-full h-full object-cover"/>
                                            </div>
                                            <p className="text-gray-600 text-sm">@{mensaje.autorMensaje.nickname}</p>
                                        </div>
                                        <div className="ml-4" style={{maxWidth: 'calc(100% - 5rem)', flexBasis: 'auto'}}> {}
                                            <p className="text-gray-800">{mensaje.mensaje}</p>
                                        </div>    
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white p-4 flex w-full mb-4 mt-4">
                            <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Escribe un mensaje..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                            className="ml-5 focus:outline-none"
                            onClick={handleSendMessage}
                            >
                            <PaperAirplaneIcon className="h-10 w-10 fill-gray-600 hover:fill-gray-800 cursor-pointer transition-colors duration-200" />
                            </button>
                        </div>
                    </div>

                )}
            </div>

            <div className="fixed top-0 right-0 m-4">
                <a href="/foro" className={"bg-primary-gray w-10 h-10 flex items-center justify-center rounded-full border-gray-400 border-b-[2px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[2px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] ml-auto"}>
                    <strong>X</strong>
                </a>
            </div>
        </section>
    );
}