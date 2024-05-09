"use client"

import ActivityCard from '@/components/ActivityCard'
import Sidebar from '@/components/Sidebar';
import Featured from '@/components/Featured';
import CreateActivity from '@/components/CreateActivityForm';
import CrearThreadForm from '@/components/CreateThreadForm0';

import {useState, useEffect} from 'react'
import {BACKEND_URI} from '@/config/env'


export default function zzHilo() {

    const [activity, setActivity] = useState('any');
    const [searchTerm, setSearchTerm] = useState('');
    const [activityCards, setActivityCards] = useState([]);
    const [pagesData, setPagesData] = useState(null);
    const [showPopup, setShowPopup] = useState(false); // Estado para controlar la visibilidad del popup
    const [showActInfo, setShowActInfo] = useState(false);
    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    // Función para cerrar el popup
    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const handleOpenActInfo = () => {
        setShowActInfo(true);
    }

    const handleCloseActInfo = () => {
        setShowActInfo(false);
    }


    return (
        <div className='flex justify-center p-10'>
                    <button
                        onClick={handleOpenPopup} className={"bg-indigo-600 text-white px-4 py-2 rounded-lg border-indigo-700 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"}>
                        +
                    </button> Crear Hilo
                    {showPopup && (
                        <CrearThreadForm isOpen={showPopup} closePopup={handleClosePopup} />
                    )}
        </div>
    );
};

