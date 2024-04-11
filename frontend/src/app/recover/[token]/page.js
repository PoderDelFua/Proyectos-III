"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {BACKEND_URI} from "@/config/env";
import { useParams } from 'next/navigation'

const TokenPage = () => {
    const router = useRouter();
    const token  = useParams().token;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    //Falta verificar el token onload

    const resetPassword = async (e) => {
        e.preventDefault();
        if(!token){
            alert('No se ha proporcionado un token');
            router.push('/login');
        }
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // Aquí deberías hacer la petición al backend para resetear la contraseña
        // usando el token y la nueva contraseña
        const response = await fetch(`${BACKEND_URI}/usuario/resetPassword`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ password }),
        });

        const data = await response.json();
        if (data.message === 'Contraseña actualizada correctamente') {
            router.push('/login');
        } else {
            alert(data.message);
        }
    };
    useState(() => {
        if (!token) {
            router.push('/login');
        }
    })

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold text-center mb-4">Restablecer Contraseña</h1>
                <form onSubmit={resetPassword} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                        <input
                            type="password"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirma tu Contraseña</label>
                        <input
                            type="password"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Restablecer Contraseña
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TokenPage;
