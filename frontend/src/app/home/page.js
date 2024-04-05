"use client"

import Navbar from '@/components/Navbar';
import PageCard from '@/components/PageCard'
import Sidebar from '@/components/Sidebar';
import Featured from '@/components/Featured';
import CreateActivity from '@/components/CreateActivityForm'; // Asegúrate de importar tu componente de formulario

import {useState, useEffect} from 'react'
import {BACKEND_URI} from '@/config/env'

export default function PageList() {
    const [activity, setActivity] = useState('any');
    const [searchTerm, setSearchTerm] = useState('');
    const [pageCards, setPageCards] = useState([]);
    const [pagesData, setPagesData] = useState(null);
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
                if (!response.ok) {
                    throw new Error('No se pudo cargar la información de las actividades')
                }
                const data = await response.json()
                setPagesData(data.data)
                setPageCards(data.data)
                //Imprimimos nombre
            } catch (error) {
                console.error("Error: ", error)
            }
        }

        fetchData()
    }, []);
    useEffect(() => {
        if (pagesData) {
            filterCards();
        }
    }, [searchTerm, activity, pagesData]); // Este useEffect se dispara cuando searchTerm, activity, o pagesData cambian.

    const filterCards = () => {
        let filteredList = pagesData || [];

        if (activity !== 'any') {
            const lowerCaseActivity = activity.toLowerCase();
            filteredList = filteredList.filter((data) =>
                (Array.isArray(data.instrumento) && data.instrumento.some(instr =>
                    instr.nombre && instr.nombre.toLowerCase() === lowerCaseActivity)) || // Verificamos que instr.nombre no sea undefined antes de llamar a toLowerCase()
                (Array.isArray(data.gusto_musical) && data.gusto_musical.includes(activity))
            );
        }

        setPageCards(filteredList);
    };



    const handleSearch = (e) => {
        e.preventDefault()
        let filteredList = pagesData;

        if (searchTerm !== '') {
            filteredList = filteredList.filter((data) => {
                const term = searchTerm.toLowerCase();
                return data.nombre.toLowerCase().includes(term) ||
                    data.descripcion.toLowerCase().includes(term) ||
                    data.instrumento.some(instr => typeof instr === 'string' && instr.toLowerCase().includes(term)) ||
                    data.gusto_musical.some(gusto => typeof gusto === 'string' && gusto.toLowerCase().includes(term));
            });
        }


        if (activity !== 'any') {
            filteredList = filteredList.filter((data) =>
                data.instrumento.includes(activity) ||
                data.gusto_musical.includes(activity)
            );
        }

        setPageCards(filteredList)
    }
    if (!pagesData) {
        return <div>Loading...</div>
    }

    return (
        <section className="flex-wrap">
            <div className="w-full md:w-1/4">
                <Sidebar/>
            </div>
            <div className="w-full h-screen bg-white shadow-inner flex justify-center">
                <div className="relative p-4 w h md:h-auto md:w-2/3">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 mb-8">
                        <div className="flex flex-grow">
                            <input type="text" placeholder="Search for webpages..."
                                   onChange={(e) => setSearchTerm(e.target.value)}
                                   className="w-full px-3 h-10 rounded-l border-2 border-indigo-600 focus:outline-none focus:border-indigo-500"/>
                            <button type="submit"
                                    className="bg-indigo-600 text-white rounded-r px-2 md:px-3 py-0 md:py-1">Buscar
                            </button>
                        </div>
                        <select id="activity" name="activity" onChange={(e) => setActivity(e.target.value)}
                                className="w-full md:w-1/3 h-10 border-2 border-indigo-600 focus:outline-none focus:border-indigo-500 text-gray-700 rounded px-4 py-2 tracking-wider">
                            <option value="any">Cualquier instrumento</option>
                            <option value="violin">Violín</option>
                            <option value="guitarra">Guitarra</option>
                            <option value="flauta travesera">Flauta travesera</option>
                            <option value="flauta">Flauta</option>
                            <option value="clarinete">Clarinete</option>
                            <option value="saxofon">Saxofón</option>
                            <option value="trompeta">Trompeta</option>
                            <option value="trombón">Trombón</option>
                            <option value="trompa">Trompa</option>
                            <option value="tuba">Tuba</option>
                            <option value="oboe">Oboe</option>
                            <option value="fagot">Fagot</option>
                            <option value="guitarra acustica">Guitarra acústica</option>
                            <option value="guitarra electrica">Guitarra eléctrica</option>
                            <option value="guitarra clasica">Guitarra clásica</option>
                            <option value="bajo electrico">Bajo eléctrico</option>
                            <option value="viola">Viola</option>
                            <option value="violonchelo">Violonchelo</option>
                            <option value="contrabajo">Contrabajo</option>
                            <option value="ukelele">Ukelele</option>
                            <option value="banjo">Banjo</option>
                            <option value="piano">Piano</option>
                            <option value="bateria">Batería</option>
                        </select>
                    </form>
                    <button
                        onClick={handleOpenPopup} className={"bg-indigo-600 text-white px-4 py-2 rounded-lg border-indigo-700 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"}>
                        +
                    </button>
                    {showPopup && (
                        <CreateActivity isOpen={showPopup} closePopup={handleClosePopup} />
                    )}
                    <div className="custom-grid-itemActividad">
                        {pageCards.map(page => {
                            return (
                                <div key={page._id} className="custom-page-card">
                                    <PageCard
                                        page={page}
                                        userId=''
                                        userName=''
                                        isExpanded={showActInfo}
                                        openInfo={handleOpenActInfo}
                                        closeInfo={handleCloseActInfo}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/4">
                <Featured/>
            </div>
        </section>
    );
};