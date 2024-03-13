"use client"

import React, { useState, useEffect } from 'react'
import RegisteredNavbar from '@/components/RegisteredNavbar'
import MultiSelect from '@/components/MultiSelect';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { BACKEND_URI } from '@/config/env';

export default function ModifyUser() {
    const params = useParams()
    const [userData, setUserData] = useState(null)
    const router = useRouter()

    const [nombre, setNombre] = useState('');
    const [instrumento, setInstrumento] = useState([]);
    const [gustoMusical, setGustoMusical] = useState('');
    const [bio, setBio] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        //Se asignan los valores de user por si no se actualizan los campos que se envien los que ya tenia
        const user = {
            id: userData._id,
            nombre: nombre || userData.nombre,
            instrumento: instrumento || userData.instrumento,
            gusto_musical: gustoMusical || userData.gusto_musical,
            bio: bio || userData.bio,
            correo: userData.correo,
            nickname: nickname || userData.nickname
        };

        try {
            console.log(userData._id)
            console.log(user)
            const response = await fetch(`${BACKEND_URI}/usuario/${userData._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(user),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                router.push(`/registered/${params.userId}`)
            } else {
                const errorData = await response.text();
                console.error('Error during update operation:', errorData);
            }
        } catch (error) {
            console.error('Error during update operation:', error);
        }
    }

   const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`${BACKEND_URI}/usuario/deleteItem/${userData._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                router.push('/');
            } else {
                const errorData = await response.text();
                console.error('Error during delete operation:', errorData);
            }
        } catch (error) {
            console.error('Error during delete operation:', error);
        }
    }
    

    //opciones instrumentos
    const instrumentoOptions  = ['violin', 'guitarra', 'percusion', 'teclado']

    //opciones niveles
    const nivelOptions = ['Principiante', 'Medio', 'Avanzado']

    return (
        <section>
            
            <RegisteredNavbar userId={params.userId} userEmail={userData.correo} />
            
            <div className="min-h-screen bg-gray-100 flex justify-center">
                <div className="py-6 px-8 mt-20 bg-white rounded shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="nombre" className="block text-gray-800 font-bold">Nombre completo: </label>
                            <input onChange={(e) => setNombre(e.target.value)} type="text" name="nombre" id="nombre" placeholder={userData.nombre} className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="gustoMusical" className="block text-gray-800 font-bold">Gusto musical:</label>
                            <input onChange={(e) => setGustoMusical(e.target.value)} type="text" name="gustoMusical" id="gustoMusical" placeholder={userData.gusto_musical} className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <div className="mb-6">
                            <MultiSelect
                                formFieldName={"instrumento"}
                                options={instrumentoOptions}
                                onChange={(selectedOptions) => setInstrumento(selectedOptions.map(option => ({ nombre: option, niveles: [] })))} 
                                prompt="Seleccione uno o mas instrumentos" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="bio" className="block text-gray-800 font-bold">Biografía:</label>
                            <textarea onChange={(e) => setBio(e.target.value)} name="bio" id="bio" rows="3" placeholder={userData.bio} className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"></textarea>
                        </div>


                        {instrumento.map((inst, index) => (
                            <div key={inst.nombre} className="mb-6">
                            <MultiSelect
                                formFieldName={`nivel_${inst.nombre}`}
                                options={nivelOptions}
                                value={inst.niveles}
                                onChange={(selectedOptions) => {
                                const newInstrumento = instrumento.map((instrumento, idx) => {
                                    if (index === idx) {
                                    return { ...instrumento, nivel: selectedOptions };
                                    }
                                    return instrumento;
                                });
                                setInstrumento(newInstrumento);
                                }}
                                prompt={`Seleccione el nivel para ${inst.nombre}`}
                            />
                            </div>
                        ))
                        }

                        <div className="mb-6">
                            <label htmlFor="nickname" className="block text-gray-800 font-bold">Nickname:</label>
                            <input onChange={(e) => setNickname(e.target.value)} type="text" name="nickname" id="nickname" placeholder={userData.nickname} className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-800 font-bold">Contraseña:</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="contraseña" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between">
                                <button type="submit" className="cursor-pointer py-2 px-4 text-white font-bold w-1/2 rounded mr-8 custom-enter-button">Actualizar</button>
                                <button type="button" onClick={handleDeleteAccount} className="cursor-pointer py-2 px-4 text-white font-bold w-1/2 rounded custom-delete-button">Borrar cuenta</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
