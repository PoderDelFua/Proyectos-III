"use client"

import React, { useState, useEffect } from 'react'
import RegisteredNavbar from '@/components/RegisteredNavbar'
import MultiSelect from '@/components/MultiSelect';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';

export default function ModifyUser() {
    const router = useRouter();
    const params = useParams()
    const [userData, setUserData] = useState(null);

    const [interests, setInterests] = useState([]);
    const [receiveOffers, setReceiveOffers] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/usuario`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                });

                const data = await response.json();
                console.log(data);
                setUserData(data.data)
            } catch (error) {
                console.error("Error: ", error)
            }
        }

        fetchData()
    }, [params.userId])

    if (!userData) {
        return <div>Loading...</div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {
            id: userData.id,
            name: userData.name,
            age: userData.age,
            city: "Madrid",
            interests: interests,
            receiveOffers: receiveOffers,
            email: userData.email,
            password: userData.password,
        };

        fetch('/api/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        router.push(`/registered/${params.userId}`)
    }

    const handleDeleteAccount = () => {
        const isConfirmed = window.confirm('¿Estás seguro/a de que quieres eliminar tu cuenta?');

        if (isConfirmed) {
            fetch('/api/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: userData.id}),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))

            router.push("/")
        }
    }

    const interestsOptions = ['violin', 'guitarra', 'percusion', 'teclado']

    return (
        <section>
            <div>
                <RegisteredNavbar userId={params.userId} userEmail={userData.email} />
            </div>
            <div className="h-screen bg-gray-100 flex justify-center">
                <div className="py-6 px-8 h-96 mt-20 bg-white rounded shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <MultiSelect
                                formFieldName={"interests"}
                                options={interestsOptions}
                                onChange={(e) => setInterests(e)}
                                prompt="Seleccione uno o mas instrumentos" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="offers" className="block text-gray-800 font-bold">¿Quieres recibir nuestras ofertas especiales?</label>
                            <input onChange={(e) => setReceiveOffers(e.target.checked)} type="checkbox" name="offers" id="offers" />
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <button type="submit" className="py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold rounded">Actualizar</button>
                                <button type="button" onClick={handleDeleteAccount} className="py-2 px-4 block mt-6 bg-red-500 text-white font-bold rounded">Borrar cuenta</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
