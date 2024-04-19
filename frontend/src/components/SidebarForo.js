import { useEffect, useState } from 'react';
import { BACKEND_URI } from "@/config/env";

function SidebarForo({ selectedTab = '' }) {
    const [activeItem, setActiveItem] = useState(selectedTab.toLowerCase());
    const [hilos, setHilos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URI}/hilo`, {
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
                    titulo: hilo.titulo,
                    creador: `@${hilo.creadorId.nickname}`,
                    postCount: hilo.postCount
                })));
            } catch (error) {
                console.error("Error al cargar la información de los hilos: ", error);
            }
        }

        fetchData();
    }, []);

    const handleItemClick = (item) => {
        setActiveItem(item.toLowerCase());
    };

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-primary-gray rounded-r-3xl z-50">
            <div className="flex flex-col h-full">
                <nav className="flex-1 pl-4 py-4 space-y-4">
                    <h2 className="text-2xl font-bold">Foro</h2>
                    <h2 className="text-xl font-bold">Temas</h2>
                    {hilos.map((hilo) => (
                        <div key={hilo.titulo} className={`${activeItem !== hilo.titulo.toLowerCase() ? 'pr-10' : '' }`}>
                            {activeItem === hilo.titulo.toLowerCase() && (
                                <div className="relative">
                                    <div className="absolute bottom-0 right-0 h-5 w-5 bg-white"></div>
                                    <div className="absolute bottom-0 right-0 h-5 w-5 bg-primary-gray rounded-br-full"></div>
                                </div>
                            )}
                            <a
                                href="#"
                                onClick={() => handleItemClick(hilo.titulo)}
                                className={`group flex items-center py-2 px-4 text-black ${
                                    activeItem === hilo.titulo.toLowerCase() ? 'bg-white rounded-l-full' : 'hover:bg-light-gray rounded-full'
                                }`}
                            >
                                <div className="flex justify-between items-center p-2">
                                    <div>
                                        <p className="font-medium">{hilo.titulo}</p>
                                        <p className="text-sm text-gray-600">Creador: {hilo.creador}</p>
                                        <p className="text-sm text-gray-600">{hilo.postCount} posts</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default SidebarForo;
