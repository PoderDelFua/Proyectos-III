import { useEffect, useState } from 'react';
import { BACKEND_URI } from "@/config/env";
import { useRouter } from 'next/navigation';

function SidebarForo({ selectedTab = '' }) {
    const [activeItem, setActiveItem] = useState(selectedTab.toLowerCase());
    const [hilos, setHilos] = useState([]);
    const router = useRouter();

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
    }, []);

    const handleItemClick = (hilo) => {
        setActiveItem(hilo.titulo.toLowerCase());
        localStorage.setItem('currentHiloId', hilo._id); // Guardar el ID del hilo en localStorage
        router.push(`/foro/${hilo._id}`); // Navegar a la página del hilo seleccionado
    };

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-primary-gray rounded-r-3xl z-50 overflow-hidden">
            <div className="flex flex-col h-full">
                <nav className="flex-1 pl-4 py-4 space-y-4 overflow-y-auto">
                    <h2 className="text-2xl font-bold">Foro</h2>
                    <h2 className="text-xl font-bold">Temas</h2>
                    {hilos.map((hilo) => (
                        <div
                            key={hilo.titulo}
                            className={`group flex items-center py-2 px-4 text-black ${activeItem === hilo.titulo.toLowerCase() ? 'bg-white rounded-l-full' : 'hover:bg-light-gray rounded-full'}`}
                            onClick={() => handleItemClick(hilo)}
                        >
                            <div className="flex justify-between items-center p-2 w-full">
                                <div>
                                    <p className="font-medium">{hilo.titulo}</p>
                                    <p className="text-sm text-gray-600">Creador: {hilo.creador}</p>
                                    <p className="text-sm text-gray-600">{hilo.postCount} posts</p>
                                </div>
                                {activeItem === hilo.titulo.toLowerCase() && (
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default SidebarForo;