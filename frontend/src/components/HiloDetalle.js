
import { useEffect, useState } from 'react';
import { BACKEND_URI } from '@/config/env';

function HiloDetalle({ hiloId }) {
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        const fetchMensajes = async () => {
            try {
                const response = await fetch(`${BACKEND_URI}/mensajes/${hiloId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('No se pudo cargar la información de los mensajes');
                }
                const data = await response.json();
                setMensajes(data);
            } catch (error) {
                console.error("Error al cargar los mensajes del hilo: ", error);
            }
        };

        fetchMensajes();
    }, [hiloId]);

    return (
        <div>
            {mensajes.map(mensaje => (
                <div key={mensaje._id}>
                    <p>{mensaje.texto}</p>
                    <p>Escrito por: @{mensaje.autorMensaje.nickname}</p>
                </div>
            ))}
        </div>
    );
}

export default HiloDetalle;
