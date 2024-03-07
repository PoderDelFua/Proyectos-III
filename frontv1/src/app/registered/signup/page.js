"use client"

import Navbar from '@/components/Navbar';
import MultiSelect from '@/components/MultiSelect';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//import { v4 as uuidv4 } from 'uuid'; Hace falta esto????

const BACKEND_URL = "http://localhost:9000/api";

export default function RegisterUser() {
    const router = useRouter();

    const [nombre, setNombre] = useState('');
    const [instrumento, setInstrumento] = useState([]);
    const [gustoMusical, setGustoMusical] = useState('');
    const [bio, setBio] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    
    const handleSubmit = async (e) => {
        e.preventDefault()


        const user = {
            nombre,
            instrumento,
            gusto_musical: gustoMusical,
            bio,
            correo,
            password,
            nickname
        };

        const userExistsResponse = await fetch(`${BACKEND_URL}/usuario/checkUserExists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo }),
        });
        

        const data = await userExistsResponse.json()
        console.log(data)

        if (data.status == 500) {
            alert(data.message)
            return
        } else if (data.exists) {
            alert("The user with this email already exists")
            return
        }

        fetch(`${BACKEND_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        router.push('/')
    }

    const instrumentoOptions  = ['violin', 'guitarra', 'percusion', 'teclado']

    return (
        <section>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex justify-center">
                <div className="py-6 px-8 mt-20 bg-white rounded shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="nombre" className="block text-gray-800 font-bold">Nombre completo:</label>
                            <input onChange={(e) => setNombre(e.target.value)} type="text" name="nombre" id="nombre" placeholder="John Doe" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <div className="mb-6">
                            <MultiSelect
                                formFieldName={"instrumento"}
                                options={instrumentoOptions}
                                onChange={(selectedOptions) => setInstrumento(selectedOptions)}
                                prompt="Seleccione uno o mas instrumentos" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="gustoMusical" className="block text-gray-800 font-bold">Gusto musical:</label>
                            <input onChange={(e) => setGustoMusical(e.target.value)} type="text" name="gustoMusical" id="gustoMusical" placeholder="Tu gusto musical" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="bio" className="block text-gray-800 font-bold">Biografía:</label>
                            <textarea onChange={(e) => setBio(e.target.value)} name="bio" id="bio" rows="3" placeholder="Cuéntanos algo sobre ti..." className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"></textarea>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="nickname" className="block text-gray-800 font-bold">Nickname:</label>
                            <input onChange={(e) => setNickname(e.target.value)} type="text" name="nickname" id="nickname" placeholder="Tu apodo" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="correo" className="block text-gray-800 font-bold">Email:</label>
                            <input onChange={(e) => setCorreo(e.target.value)} type="email" name="correo" id="correo" placeholder="tucorreo@dominio.com" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-800 font-bold">Contraseña:</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="contraseña" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600" />
                        </div>

                        <Link href="/registered/login" className="text-sm font-thin text-gray-800 hover:underline mt-2 mr-3 inline-block hover:text-indigo-600">¿Ya tienes una cuenta?</Link>
                        <button type="submit" className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Registrarse</button>
                    </form>
                </div>
            </div>
        </section>
    );
}