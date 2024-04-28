"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {BACKEND_URI} from "@/config/env";
import Link from 'next/link'

export default function RecoverPassword() {
    const [correo, setCorreo] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Correo:', correo)
        const response = await fetch(`${BACKEND_URI}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo }),
        })

        if (response.ok) {
            alert('Código de recuperación enviado correctamente')
        } else {
            console.error('Error al enviar el código de recuperación')
            console.error(await response.text())
        }
    }

    return (

        <div className="flex flex-col justify-between h-screen">
          
        <div className="rounded-lg text-center">
        <img src="/fondo-login.png" alt="Background" className="w-full h-48 object-cover" />
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-full bg-white-100 p-4">
                    

                    <div>
                        <h2 htmlFor="titulo" className="text-center text-gray-3000 font-bold text-4xl">Recuperar contraseña</h2>
                    </div>
                    <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
                        
                        <label className="block">
                            
                            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required
                               placeholder="Correo Electronico"  className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600 custom-rectangulo" />
                        </label>

                        <div className="flex justify-center mb-8">
                            <button type="submit" className="cursor-pointer py-2 px-4 text-white font-bold w-1/2 rounded custom-cancel-button">
                                Enviar código de recuperación
                            </button>
                        </div>
                    </div>
                </form>
        </div>
  
        <div className="flex flex-col">
          <hr className="border-gray-200 my-10" />
  
          <div className="flex justify-center space-x-8 text-gray-500 text-base pb-6 mb-2">
            <Link href="#" className="hover:text-gray-800">
              Contact Us
            </Link>
            <Link href="#" className="hover:text-gray-800">
              About Us
            </Link>
            <Link href="#" className="hover:text-gray-800">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    );
}