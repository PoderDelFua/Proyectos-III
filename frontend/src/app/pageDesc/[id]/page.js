"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ActivityDetailPage() {
    const [activity, setActivity] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            fetch(`/api/actividades/${router.query.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP status ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setActivity(data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setActivity({});
                });
        }
    }, [router.isReady, router.query.id]);

    if (!activity || Object.keys(activity).length === 0) {
        return <div className="flex justify-center items-center h-screen">
            <p>Cargando...</p>
        </div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-5">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                <h1 className="text-3xl font-bold mb-2">{activity.title || 'Título no disponible'}</h1>
                <p className="text-gray-700">{activity.summary || 'Resumen no disponible'}</p>
            </div>
        </div>
    );
}
