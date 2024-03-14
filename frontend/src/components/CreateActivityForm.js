//componente de un formulario a implementar en la página de activiades para la creción de las mismas
"use client"

import MultiSelect from '@/components/MultiSelect'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URI } from '@/config/env'

export default function UpdateUser() {
    const router = useRouter()
    const [nombre, setNombre] = useState('')
    const [bio, setBio] = useState('')
    const [instrumento, setInstrumento] = useState([])  
    const [nivel, setNivel] = useState('')
    const [espacioReservado, setEspacioReservado] = useState('')
    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')
    const [visibilidad, setVisibilidad] = useState('')

    //Este es el mismo de el page.js del register no se a donde se pushea si que que directorios empleas pra este form

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
                setBio(userData.bio)
                setInstrumento(userData.instrumento)
                setNivel(userData.nivel)
                setEspacioReservado(userData.espacio_reservado)
                setFecha(userData.fecha)
                setHora(userData.hora)
                setVisibilidad(userData.visibilidad)
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
            nivel,
            espacioReservado,
            bio,
            fecha,
            hora,
            visibilidad
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

    var instrumentoOptions = ['Flauta travesera', 'Flauta', 'Clarinete', 'Saxofón', 'Trompeta', 'Trombón', 'Trompa', 'Tuba', 'Oboe', 'Fagot', 'Guitarra acústica', 'Guitarra eléctrica', 'Guitarra clásica', 'Bajo eléctrico', 'Violín', 'Viola', 'Violonchelo', 'Contrabajo', 'Ukelele', 'Banjo', 'Piano/Teclado eléctrico', 'Batería', 'Xilófono', 'Cajón']
    var nivelOptions = ['Principiante', 'Medio', 'Avanzado']
    var visibilidadOptions = ['Privado', 'Publico']

    return (
        <section>
            <div className="min-h-screen bg-gray-100 flex justify-center">
                <div className="py-6 px-8 mt-20 bg-white rounded shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="nombre" className="block text-gray-800 font-bold">Nombre de la Actividad:</label>
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
                            <label htmlFor="bio" className="block text-gray-800 font-bold">Descripción de la Actividad:</label>
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} name="bio" id="bio" rows="3" placeholder="De que va la actividad..." className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"></textarea>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="nivel" className="block text-gray-800 font-bold">Nivel de la Actividad:</label>
                            <select value={nivel} onChange={(e) => setBio(e.target.value)} name="nivel" id="nivel" >
                                {nivelOptions.map((nivel, index) => (
                                    <option key={index} value={nivel}>{nivel}</option>
                                ))}

                            </select>
                                
                        </div>

                        <div className="mb-6">
                            <label htmlFor="espacioReservado" className="block text-gray-800 font-bold">Lugar de la Actividad:</label>
                            <input value={espacioReservado} onChange={(e) => setNombre(e.target.value)} type="text" name="espacioActividad" id="espacioActividad" placeholder="Clase M-202" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <div className="mb-6">
                             <label htmlFor="fecha" className="block text-gray-800 font-bold">Fecha de la Actividad:</label>
                             <input value={fecha} onChange={(e) => setNombre(e.target.value)} type="date" name="fecha" id="feha"  className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="hora" className="block text-gray-800 font-bold">Hora de la Actividad:</label>
                            <input value={hora} onChange={(e) => setNombre(e.target.value)} type="time" name="hora" id="hora"  className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="visibilidad" className="block text-gray-800 font-bold">Privacidad de la Actividad:</label>
                            <select value={visibilidad} onChange={(e) => setBio(e.target.value)} name="visibilidad" id="visibilidad" >
                            {visibilidadOptions.map((visibilidad, index) => (
                                    <option key={index} value={visibilidad}>{visibilidad}</option>
                                ))}

                            </select>

                        </div>



                        <button type="submit" className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Crear Actividad</button>
                    </form>
                </div>
            </div>
        </section>
    )

}
