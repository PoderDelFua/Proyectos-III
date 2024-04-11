"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {BACKEND_URI} from "@/config/env";

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
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-center text-gray-800">Recuperar contraseña</h2>
                <label className="block">
                    <span className="text-gray-700">Correo electrónico:</span>
                    <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required
                           className="mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
                </label>
                <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Enviar código de recuperación
                </button>
            </div>
        </form>
    )
}