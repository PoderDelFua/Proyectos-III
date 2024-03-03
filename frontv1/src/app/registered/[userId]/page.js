"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisteredNavbar from '@/components/RegisteredNavbar';
import RegisteredWelcomePage from '@/components/RegisteredWelcomePage';

const BACKEND_URL = "http://localhost:9000/api";

export default function UserPage() {
    const router = useRouter();
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (router.isReady) {
            setUserId(router.query.userId);
        }
    }, [router, router.isReady, router.query]);

    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('No se pudo cargar la información del usuario');
                    }

                    const data = await response.json();
                    setUserData(data);
                } catch (error) {
                    console.error("Error al cargar la información del usuario: ", error);
                }
            };

            fetchData();
        }
    }, [userId]); 

    if (!userData) {
        return <div>Cargando...</div>; 
    }

    return (
        <section>
            <RegisteredNavbar userId={userId} userEmail={userData.correo} />
            <RegisteredWelcomePage userId={userId} />
        </section>
    );
}
