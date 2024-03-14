"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { v4 as uuidv4 } from 'uuid';

export default function PageCard({ page, userId, userName }) {
    const router = useRouter();

    const handleRedirect = (e) => {
        e.preventDefault()

        // Asegúrate de obtener el ID de la página o actividad desde el prop `page`
        // Suponiendo que `page` tiene una propiedad `id` que puedes usar
        const id = page.id;


        // router.push(`#`)
        router.push(`/pageDesc/${id}`);//`/registered/${userId}/modify`
    }

    return (
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            {/* Placeholder for the image. Replace 'path/to/image.jpg' with your image path */}
            <img src="bg.jpg" alt="Activity" className="object-cover w-full h-32" />
            <div className="max-w-sm p-6 flex flex-col justify-between flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray">{page.title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{page.summary}</p>
                <div className="flex items-center space-x-4">
                    <button onClick={handleRedirect} type="button" className="text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Ver más información
                    </button>
                    <button onClick={handleRedirect} type="button" className="text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Unirse
                    </button>
                    {/* {userId != '' && (
                        <button type="button" onClick={handleRedirect} className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-indigo-600 to-indigo-600 group-hover:from-indigo-500 group-hover:to-indigo-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Inscribirse
                            </span>
                        </button>
                    )} */}
                </div>
            </div>
        </div>
    )
}



// // Importaciones necesarias
// import React from 'react';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router'; // Asumiendo que estás usando Next.js por el uso de useRouter

// const PageCard = ({ page, userId }) => {
//     const router = useRouter();

//     // Función para manejar la redirección
//     const handleRedirect = () => {
//         router.push(`/pageDesc/${page.id}`); // Cambiado para redirigir a la página de detalle de la actividad
//     }

//     return (
//         <div className="mb-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{page.title}</h5>
//             <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{page.summary}</p>
//             <div className="flex items-center space-x-4">
//                 <button onClick={handleRedirect} type="button" className="text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
//                     Ver más información
//                 </button>
//                 {/* Asegúrate de adaptar o eliminar el botón "Inscribirse" según tu lógica de aplicación */}
//             </div>
//         </div>
//     );
// }

// export default PageCard;