"use client";

import ActivityCard from '@/components/ActivityCard';
import Sidebar from '@/components/Sidebar';
import Featured from '@/components/Featured';
import CreateActivity from '@/components/CreateActivityForm'; // Asegúrate de importar tu componente de formulario

import Slider from '@/components/SliderNews';
import { useState, useEffect } from 'react';
import { BACKEND_URI } from '@/config/env';

export default function PageList() {
    const [activity, setActivity] = useState('any');
    const [searchTerm, setSearchTerm] = useState('');
    const [activityCards, setActivityCards] = useState([]);
    const [activitiesData, setActivitiesData] = useState(null);
    const [showPopup, setShowPopup] = useState(false); // Estado para controlar la visibilidad del popup
    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    // Función para cerrar el popup
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URI}/actividades/getActivityData`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response);
                if (!response.ok) {
                    throw new Error('No se pudo cargar la información de las actividades');
                }
                const data = await response.json();
                setActivitiesData(data.data);
                setActivityCards(data.data);
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filterCards();
    }, [searchTerm, activity]); // Eliminado activitiesData como dependencia innecesaria

    const filterCards = () => {
        console.log('Filtrando tarjetas con términos:', searchTerm, 'y actividad:', activity);
        if (activitiesData && activity !== 'any') {
            let filteredList = activitiesData.filter((data) => {
                const term = activity.toLowerCase();
                return data.nombre.toLowerCase().includes(term) ||
                    data.descripcion.toLowerCase().includes(term) ||
                    data.instrumento.some(instr => typeof instr === 'string' && instr.toLowerCase().includes(term)) ||
                    data.gusto_musical.some(gusto => typeof gusto === 'string' && gusto.toLowerCase().includes(term));
            });
            setActivityCards(filteredList);
        } else if (activitiesData) {
            setActivityCards(activitiesData);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        let filteredList = activitiesData;

        if (searchTerm !== '') {
            filteredList = filteredList.filter((data) => {
                const term = searchTerm.toLowerCase();
                return data.nombre.toLowerCase().includes(term) ||
                    data.descripcion.toLowerCase().includes(term) ||
                    data.instrumento.some(instr => typeof instr === 'string' && instr.toLowerCase().includes(term)) ||
                    data.gusto_musical.some(gusto => typeof gusto === 'string' && gusto.toLowerCase().includes(term));
            });
        }

        setActivityCards(filteredList);
    };

    if (!activitiesData) {
        return <div>Loading...</div>;
    }

    return (
        <section className="flex-wrap">
            <div className="w-full md:w-1/4">
                <Sidebar />
            </div>
            <div className="w-full h-screen bg-white shadow-inner flex justify-center">
                <div className="relative p-4 w h md:h-auto md:w-2/3">
                    <div className="rounded-lg mb-8"><Slider /></div>
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 mb-4">
                        <div className="flex flex-grow">
                            <input type="text" placeholder="Search for activities..."
                                   onChange={(e) => setSearchTerm(e.target.value)}
                                   className="w-full px-3 h-10 rounded-l border-2 border-indigo-600 focus:outline-none focus:border-indigo-500" />
                            <button type="submit"
                                    className="bg-indigo-600 text-white rounded-r px-2 md:px-3 py-0 md:py-1">Buscar
                            </button>
                        </div>
                        <select id="activity" name="activity" onChange={(e) => setActivity(e.target.value)}
                                className="w-full md:w-1/3 h-10 border-2 border-indigo-600 focus:outline-none focus:border-indigo-500 text-gray-700 rounded px-4 py-2 tracking-wider">
                            <option value="any">Cualquier instrumento</option>
                            <option value="violín">Violín</option>
                            <option value="guitarra">Guitarra</option>
                            <option value="flauta travesera">Flauta travesera</option>
                            <option value="flauta">Flauta</option>
                            <option value="clarinete">Clarinete</option>
                            <option value="saxofón">Saxofón</option>
                            <option value="trompeta">Trompeta</option>
                            <option value="trombón">Trombón</option>
                            <option value="trompa">Trompa</option>
                            <option value="tuba">Tuba</option>
                            <option value="oboe">Oboe</option>
                            <option value="fagot">Fagot</option>
                            <option value="guitarra acústica">Guitarra acústica</option>
                            <option value="guitarra eléctrica">Guitarra eléctrica</option>
                            <option value="guitarra clásica">Guitarra clásica</option>
                            <option value="bajo eléctrico">Bajo eléctrico</option>
                            <option value="viola">Viola</option>
                            <option value="violonchelo">Violonchelo</option>
                            <option value="contrabajo">Contrabajo</option>
                            <option value="ukelele">Ukelele</option>
                            <option value="banjo">Banjo</option>
                            <option value="piano">Piano</option>
                            <option value="batería">Batería</option>
                        </select>
                    </form>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleOpenPopup}
                            className={"bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full border-indigo-700 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] ml-auto"}>
                            +
                        </button>
                    </div>
                    {showPopup && (
                        <CreateActivity isOpen={showPopup} closePopup={() => setShowPopup(false)} />
                    )}
                    <div className="custom-grid-itemActividad">
                        {activityCards.map(activity => (
                            <div key={activity._id} className="custom-activity-card">
                                <ActivityCard activity={activity} foto={activity.image ? activity.image.url : '../bg.jpg'} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className=" md:w-1/4">
                <Featured />
            </div>
        </section>
    );
}
