"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import RegisteredNavbar from '@/components/RegisteredNavbar'
import RegisteredWelcomePage from '@/components/RegisteredWelcomePage'
import { BACKEND_URI } from '@/env';

export default function UserPage() {
    //El hook useParams se utiliza para obtener el id del usuario de la URL.
    const params = useParams()
    const [userData, setUserData] = useState(null)
    const router = useRouter()
    //El hook useEffect se utiliza para cargar la información del usuario cuando la página se carga por primera vez.
    useEffect(() => {
        //El token se obtiene del almacenamiento local y se utiliza para verificar si el usuario está autenticado.

        const token = localStorage.getItem('token');
        //Si no hay token, redirigimos al usuario a la página de inicio.
        if(!token){
            router.push('/')
        }
        //Hacemos un fetch al servidor para obtener la información del usuario, a partir de su id, 
        //que hemos obtenido de la URL.
        const fetchData = async () => {
            try {
                //El GET tiene una cabecera distinta, ya que necesitamos enviar el token
                //para verificar si el usuario está autenticado.
                const response = await fetch(`${BACKEND_URI}/usuario/${params.userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
//Si la respuesta no es correcta, se muestra un mensaje de error.
                if (!response.ok) {
                    throw new Error('No se pudo cargar la información del usuario')
                }

                const data = await response.json()
                //Aqui guardamos la información del usuario en el estado userData.
                setUserData(data.data)
            } catch (error) {
                console.error("Error al cargar la información del usuario: ", error)
            }
        }

        fetchData()
    }, [params.userId]) 
//Si no hay información del usuario, se muestra un mensaje de carga.
    if (!userData) {
        return <div>Cargando...</div> 
    }
//Si hay información del usuario, se muestra la página de perfil del usuario.
//Accedemos a las propiedades de userData para obtener la información del usuario.
//Podriamos usar userData._id, pero para mostrar que no hay problema en usar el id del usuario
//Hemos usado params.userId.
    return (
        <section>
            <RegisteredNavbar userId={params.userId} userEmail={userData.correo} />
            <RegisteredWelcomePage userId={params.userId} />
        </section>
    )
}
