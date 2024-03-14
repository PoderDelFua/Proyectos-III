"use client"

import MultiSelect from '@/components/MultiSelect'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URI } from '@/config/env'


export default function UpdateUser() {
    const router = useRouter()
    const [userData, setUserData] = useState(null)
    const [nombre, setNombre] = useState('')
    const [instrumento, setInstrumento] = useState([])
    const [gustoMusical, setGustoMusical] = useState('')
    const [bio, setBio] = useState('')
    const [nickname, setNickname] = useState('')
    

    useEffect(() => {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }
            const fetchData = async () => {
                try {
                    //El GET tiene una cabecera distinta, ya que necesitamos enviar el token
                    //para verificar si el usuario está autenticado.

                    const response = await fetch(`${BACKEND_URI}/usuario/getUserData`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,                    
                        },
                    })               
                    //Si la respuesta no es correcta, se lanza un error.     
                    if (!response.ok) {
                        throw new Error('No se pudo cargar la información del usuario')
                    }
                    console.log("Buscando datos del usuario...")
                    const data = await response.json()
                    console.log(data)
                    //Aqui guardamos la información del usuario en el estado userData.
                    setUserData(data.data)
                } catch (error) {
                    console.error("Error al cargar la información del usuario: ", error)
                }
            }
    
            fetchData()
        }, [])
        useEffect(() => {
            if (userData) {
                setNombre(userData.nombre)
                setInstrumento([...userData.instrumento])
                setGustoMusical(userData.gusto_musical)
                setBio(userData.bio)
                setNickname(userData.nickname)
            }
        }, [userData]) 
    if (!userData) {
        return <div>Cargando...</div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
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

            const response = await fetch(`${BACKEND_URI}/usuario/updateUserData`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });
    
            if (response.ok) {
                const data = await response.json();
                router.push(`/home`)
            } else {
                const errorData = await response.text();
                console.error('Error during update operation:', errorData);
            }
        } catch (error) {
            console.error('Error during update operation:', error);
        }
    }

    var instrumentoOptions = ['violin', 'guitarra', 'percusion', 'teclado']
    var nivelOptions = ['Principiante', 'Medio', 'Avanzado']

    return (
        <section>
            <div className="min-h-screen bg-gray-100 flex justify-center">
                <div className="py-6 px-8 mt-20 bg-white rounded shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="nombre" className="block text-gray-800 font-bold">Nombre completo:</label>
                            <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" name="nombre" id="nombre" placeholder="John Doe" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>
                    <div className="mb-6">
                        <MultiSelect
                                formFieldName={"instrumento"}
                                options={instrumentoOptions}
                                onChange={(selectedOptions) => setInstrumento(selectedOptions.map(option => ({ nombre: option, niveles: [] })))} 
                                prompt="Seleccione uno o mas instrumentos" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="gustoMusical" className="block text-gray-800 font-bold">Gusto musical:</label>
                            <input value={gustoMusical} onChange={(e) => setGustoMusical(e.target.value)} type="text" name="gustoMusical" id="gustoMusical" placeholder="Tu gusto musical" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="bio" className="block text-gray-800 font-bold">Biografía:</label>
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} name="bio" id="bio" rows="3" placeholder="Cuéntanos algo sobre ti..." className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"></textarea>
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
                            <input value={nickname} onChange={(e) => setNickname(e.target.value)} type="text" name="nickname" id="nickname" placeholder="Tu apodo" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <button type="submit" className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Actualizar datos</button>
                    </form>
                </div>
            </div>
        </section>
    )
}