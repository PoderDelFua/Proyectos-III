"use client"

import SidebarForo from '@/components/SidebarForo';
import CrearThreadForm from '@/components/CreateThreadForm0';
import {useState, useEffect} from 'react'
import {BACKEND_URI} from '@/config/env'
import {useRouter} from "next/navigation";

export default function PageForo() {
    const [selectedTab, setSelectedTab] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [hilos, setHilos] = useState([]);
    const [like, setLike] = useState(false);
    const router = useRouter();

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
                console.log(data);
                setSelectedTab(data.titulo);
                setHilos(data); 
                
            } catch (error) {
                console.error("Error al cargar la información de los hilos: ", error);
            }
        }

        fetchData()
    }, []);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const handleHiloClick = (hiloId) => {
        localStorage.setItem('currentHiloId', hiloId);
        router.push(`/foro/${hiloId}`);
    };

    
    return (
        <section className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/6">
                <SidebarForo selectedTab={selectedTab}/>
            </div>
            <div className="w-full md:w-2/3 mr-20 mb-20">
                {hilos.map(hilo => (
                    <div key={hilo._id} className="relative mt-4">
                        <div className="bg-primary-gray p-8 rounded-lg flex items-center" onClick={() => handleHiloClick(hilo._id)}>
                            <div className="flex items-center" style={{flexWrap: 'wrap'}}> {}
                                <div className="flex flex-col items-center"
                                     style={{flexShrink: 0}}> {}
                                    <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
                                        <img src="/no-profile.png" alt="Profile"
                                             className="w-full h-full object-cover"/>
                                    </div>
                                    <p className="text-gray-600 text-sm">@{hilo.creadorId.nickname}</p>
                                </div>
                                <div className="ml-4"
                                     style={{maxWidth: 'calc(100% - 5rem)', flexBasis: 'auto'}}> {}
                                    <h1 className="font-bold text-xl truncate">{hilo.titulo}</h1>
                                    <h3 className="text-lg mt-4 truncate">{hilo.descripcion}</h3>
                                </div>
                            </div>
                            <p className="absolute bottom-0 right-0 mb-2 mt-2 mr-10 cursor-pointer">3</p>
                            <button
                                onClick={() => setLike(!like)}
                                className="absolute bottom-0 right-0 mb-2 mt-2 mr-2 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     className="bi bi-heart" viewBox="0 0 16 16">
                                    <path
                                        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                </svg>
                            </button>
                            <p className="absolute bottom-0 right-0 mb-2 mt-2 mr-24 cursor-pointer">{hilo.postCount}</p>
                            <button
                                onClick={() => setLike(!like)}
                                className="absolute bottom-0 right-0 mb-2 mt-2 mr-16 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     className="bi bi-chat-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed top-0 right-0 m-4">
                <a href="/home" className={"bg-primary-gray w-10 h-10 flex items-center justify-center rounded-full border-gray-400 border-b-[2px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[2px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] ml-auto"}>
                    <strong>X</strong>
                </a>
            </div>
            
            <div className="flex justify-center items-center fixed bottom-4 inset-x-0 ml-40">
                <button onClick={handleOpenPopup} className="bg-white text-gray-800 px-80 py-3 rounded-lg shadow-lg border border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:shadow-xl transition duration-300">
                Crear nuevo hilo
                </button>
                {showPopup && (
                <CrearThreadForm isOpen={showPopup} closePopup={handleClosePopup} />
                )}
            </div>

        </section>
    )
}