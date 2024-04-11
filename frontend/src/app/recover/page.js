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
        <form onSubmit={handleSubmit}>
            <label>
                Correo electrónico:
                <input type="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
            </label>
            <button type="submit">Enviar código de recuperación</button>
        </form>
    )
}