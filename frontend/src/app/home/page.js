"use client"

import Navbar from '@/components/Navbar';
import PageCard from '@/components/PageCard'
import Sidebar from '@/components/Sidebar';
import Featured from '@/components/Featured';

import {useState, useEffect} from 'react'
import {BACKEND_URI} from '@/config/env'

export default function PageList() {
    const [activity, setActivity] = useState('any');
    const [searchTerm, setSearchTerm] = useState('');
    const [pageCards, setPageCards] = useState([]);
    const [pagesData, setPagesData] = useState(null);


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
        <section>
            {/* <div>
                <Sidebar />
            </div> */}
            <div className="h-screen bg-white shadow-inner flex justify-center">
                {/*<Sidebar /> {/* This will be the left sidebar */}
                <div className="relative p-4 w h md:h-auto">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
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
                            <option value="violin">violin</option>
                            <option value="guitarra">Guitarra</option>
                            <option value="flauta travesera">Flauta travesera</option>
                            <option value="flauta">flauta</option>
                            <option value="clarinete">clarinete</option>
                            <option value="saxofon">saxofon</option>
                            <option value="trompeta">trompeta</option>
                            <option value="trombón">trombón</option>
                            <option value="trompa">trompa</option>
                            <option value="tuba">tuba</option>
                            <option value="oboe">oboe</option>
                            <option value="fagot">fagot</option>
                            <option value="guitarra acustica">Guitarra acustica</option>
                            <option value="guitarra electrica">Guitarra electrica</option>
                            <option value="guitarra clasica">Guitarra clasica</option>
                            <option value="bajo electrico">bajo electrico</option>
                            <option value="viola">viola</option>
                            <option value="violonchelo">violonchelo</option>
                            <option value="contrabajo">contrabajo</option>
                            <option value="ukelele">ukelele</option>
                            <option value="banjo">banjo</option>
                            <option value="piano">piano</option>
                            <option value="bateria">bateria</option>
                        </select>
                    </form>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {pageCards.map(page => {
                            return <PageCard
                                page={page}
                                userId=''
                                userName=''
                                key={page._id}
                            />;
                        })}
                    </div>
                </div>
            </div>
            <div>
                <Sidebar/>
            </div>
            <div>
                <Featured/>
            </div>
        </section>
    );
};