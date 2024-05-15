"use client"

import { useEffect, useState } from 'react';
import { BACKEND_URI } from "@/config/env";
import { useRouter } from 'next/navigation';
import { Bars3Icon } from '@heroicons/react/24/solid';

function SidebarForo({ selectedTab = '' }) {
    const [activeItem, setActiveItem] = useState(selectedTab.toLowerCase());
    const [hilos, setHilos] = useState([]);
    const [SidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const selectedTabLocal = localStorage.getItem('selectedTab');
        if (selectedTabLocal) {
            setActiveItem(selectedTabLocal.toLowerCase());
        }
    }, [selectedTab]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URI}/hilo/hilosPublicos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('No se pudo cargar la información de los hilos');
                }
                const data = await response.json();
                setHilos(data.map(hilo => ({
                    _id: hilo._id,
                    titulo: hilo.titulo,
                    creador: `@${hilo.creadorId.nickname}`,
                    postCount: hilo.postCount
                })));
            } catch (error) {
                console.error("Error al cargar la información de los hilos: ", error);
            }
        }

        fetchData();
    }, [selectedTab]);

    const handleItemClick = (hilo) => {
        setActiveItem(hilo.titulo.toLowerCase());
        localStorage.setItem('currentHiloId', hilo._id);
        localStorage.setItem('selectedTab', hilo.titulo);
        router.push(`/foro/${hilo._id}`);
        window.location.reload();
    };

    const toggleSidebar = () => {
        setSidebarOpen(!SidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setSidebarOpen(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {SidebarOpen && window.innerWidth < 768 && (
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40`} onClick={toggleSidebar}></div>
            )}

            <div className={`fixed inset-y-0 bg-primary-gray rounded-r-3xl z-50 md:block transition-all duration-500 ${SidebarOpen ? 'left-0 w-64' : '-left-64 w-0'}`} style={{ backgroundImage: "url('/fondo-sidebar.png')" }}>
                <div className="flex flex-col h-full">
                    <nav className="flex-1 pl-4 py-4 space-y-4 overflow-y-auto">
                        <button className="flex items-center text-white  hover:font-bold  icon-custom" onClick={() => router.push("/home")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                            </svg>
                            <h2 className="text-2xl ml-2">Foro</h2>
                        </button>
                        <button className="flex items-center text-white" onClick={() => router.push("/foro")}>    
                            <h2 className="text-xl hover:font-bold text-white ml-10">Temas</h2>
                        </button>
                        
                        {hilos.map((hilo) => (
                            <div
                                key={hilo.titulo}
                                className={`group flex items-center py-2 px-4 text-black transition-all duration-300 ${activeItem === hilo.titulo.toLowerCase() ? 'bg-white rounded-l-full' : 'text-white hover:bg-light-gray hover:text-blue rounded-full'}`}
                                onClick={() => handleItemClick(hilo)}
                            >
                                <div className="flex justify-between items-center p-2 w-full">
                                    <div>
                                        <p className={`text-sm ${activeItem == hilo.titulo.toLowerCase() ? 'text-custom-active' : 'text-custom-secundario'}`}>Creador: {hilo.creador}</p>
                                        <p className="font-medium overflow-hidden whitespace-nowrap text-ellipsis" style={{ maxWidth: "calc(100% - 0.8rem)" }}>
                                            {hilo.titulo.length > 26 ? `${hilo.titulo.substring(0, 26)}...` : hilo.titulo}
                                        </p>
                                        <p className={`text-sm ${activeItem == hilo.titulo.toLowerCase() ? 'text-custom-active' : 'text-custom-secundario'}`}>{hilo.postCount} posts</p>
                                    </div>
                                    {activeItem === hilo.titulo.toLowerCase() && (
                                        <div className="relative">
                                            <div className="absolute top-0 right-0 h-5 w-5 bg-white"></div>
                                            <div className="absolute top-0 right-0 h-5 w-5 bg-sidebar-light-blue rounded-tr-full"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            <button
                onClick={toggleSidebar}
                className={`fixed md:hidden top-5 left-5 z-50 bg-primary-gray rounded-full p-3 text-black hover:bg-light-gray`}
            >
                <Bars3Icon className="h-6 w-6" />
            </button>
        </>
    );
}

export default SidebarForo;