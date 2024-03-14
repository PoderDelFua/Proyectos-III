"use client"

import MultiSelect from '@/components/MultiSelect'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URI } from '@/config/env'

export default function UpdateUser() {
    const router = useRouter()
    const [nombre, setNombre] = useState('')
    const [instrumento, setInstrumento] = useState([])
    const [gustoMusical, setGustoMusical] = useState('')
    const [bio, setBio] = useState('')
    const [nickname, setNickname] = useState('')

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }

            const response = await fetch(`${BACKEND_URI}/usuario/getUserData`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const userData = await response.json()
                setNombre(userData.nombre)
                setInstrumento(userData.instrumento)
                setGustoMusical(userData.gusto_musical)
                setBio(userData.bio)
                setNickname(userData.nickname)
            } else {
                router.push('/login')
            }
        }

        fetchUserData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
            return
        }

        const updatedUser = {
            nombre,
            instrumento,
            gusto_musical: gustoMusical,
            bio,
            nickname
        }

        fetch(`${BACKEND_URI}/usuario/updateUserData`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedUser),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        router.push('/profile')
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
                                value={instrumento.map(inst => inst.nombre)}
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
                                                return { ...instrumento, nivel: selectedOptions }
                                            }
                                            return instrumento
                                        })
                                        setInstrumento(newInstrumento)
                                    }}
                                    prompt={`Seleccione el nivel para ${inst.nombre}`}
                                />
                            </div>
                        ))}

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