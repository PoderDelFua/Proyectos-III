"use client"

import Navbar from '@/components/Navbar';
import { waitUntilSymbol } from 'next/dist/server/web/spec-extension/fetch-event';
//import Cookies from 'js-cookie' por ahora no lo importo que ni idea como manejarlo
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const BACKEND_URL = "http://localhost:9000/api";

export default function LoginUser() {

    const router = useRouter()

    const [correo, setcorreo] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            correo: correo,
            password: password,
        }

        const userExistsResponse = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, password }),
        });
        
        if (!userExistsResponse.ok) {
            alert('Error al iniciar sesión, por favor intenta de nuevo.');
            return;
        }
        const data = await userExistsResponse.json();
        if (data.usuario) {            
            //Enviamos el token local storage
            localStorage.setItem('token', data.token);
            router.push(`/registered/${data.usuario._id}`);
        } else {
            alert('Usuario o contraseña incorrecta');
        }
    }
    const handleCancelClick = () => {
        router.push('/');
    }

    return (
        <section>
           <div>
                <Navbar />
            </div>
            <div className="h-full flex justify-start " style={{backgroundImage: "url('/fondo-login.png')", backgroundSize: "cover"}}>
                <div className=" py-8 px-14 flex h-auto mt-8 mb-8 rounded ml-16 custom-container-login">
                    <form onSubmit={handleSubmit}>
                        <div className="lg:flex mb-8">
                            <img src="/u-tad_logo.png" alt="u-tad image" className="w-full lg:w-auto mb-8" />
                        </div>   
                        <div className="mb-6">
                            <label htmlFor="correo" className="block custom-letras-correo">Introduce tu correo U-tad</label>
                            <input onChange={(e) => setcorreo(e.target.value)} type="correo" name="correo" id="correo" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600 custom-rectangulo" />
                        </div>
                        <div className="">
                            <label htmlFor="password" className="block custom-letras-correo">Contraseña</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password"  className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600 custom-rectangulo" /> 
                        </div>
                        <div className="flex justify-between mt-8 mb-8">
                            <button type="button" onClick={handleCancelClick} className="cursor-pointer py-2 px-4 text-white font-bold w-1/2 rounded mr-8 custom-cancel-button">Cancelar</button>
                            <button type="submit" className="cursor-pointer py-2 px-4 text-white font-bold w-1/2 rounded custom-enter-button">Entrar</button>
                        </div>
                            
                        <Link href="/registered/signup" className="text-sm font-thin hover:underline mt-8 inline-block custom-letras-registrate">¿No estás registrado? <span className="custom-letras-registrate-color">Regístrate ahora</span></Link>
                        
                    </form>
                </div>
            </div>
        </section>
    )
}