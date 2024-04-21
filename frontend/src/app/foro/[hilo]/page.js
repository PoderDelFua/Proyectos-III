"use client"

import SidebarForo from '@/components/SidebarForo';
import { useState, useEffect } from 'react';
import { BACKEND_URI } from '@/config/env';
import { useRouter } from 'next/navigation';

export default function HiloDetallePage() {
    const router = useRouter();
    const [hilo, setHilo] = useState(null);
    const [mensajes, setMensajes] = useState([]);
    const [like, setLike] = useState(false);

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

    return (
        <div className="flex">
            <div className="w-1/5 bg-gray-100 min-h-screen p-4">
                <SidebarForo selectedTab={hilo ? hilo.titulo : ''} />
            </div>

            <div className="flex-1 p-4">
                {hilo && (
                    <div className="bg-white p-6 shadow-md rounded-lg">
                        <h1 className="text-2xl font-bold mb-2">{hilo.titulo}</h1>
                        <p className="text-gray-700 mb-4">{hilo.descripcion}</p>
                        <div className="space-y-4">
                            {mensajes.map((mensaje) => (
                                <div key={mensaje._id} className="bg-gray-50 p-4 rounded-lg shadow">
                                    <p className="text-gray-800">{mensaje.mensaje}</p>
                                    <p className="text-gray-600 text-sm mt-2">Escrito por: @{mensaje.autorMensaje.nickname}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}