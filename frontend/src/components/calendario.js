"use client"

import DiaCalendario from '@/components/diaCalendario'
import React, { useState, useCallback, useEffect, use } from 'react';
import {BACKEND_URI} from '@/config/env'
import {useRouter} from 'next/navigation'
import { set } from 'js-cookie';

const Calendario = () => {
    const router = useRouter()

    const [ano, setAno] = useState(new Date().getFullYear()); // Año actual
    const [mes, setMes] = useState(new Date().getMonth()); // Mes actual

    const [actividades, setActividades] = useState([]); // Actividades del usuario
    const [actividadesDelMes, setActividadesDelMes] = useState([]); 
    const [actividadesFormateadas, setActividadesFormateadas] = useState([])


    const fetchActividadesUser = async () => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.push('/login')
            return
        }
        try{
            const response = await fetch(`${BACKEND_URI}/actividades/getActividadesApuntado`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            //Si la respuesta no es correcta, se lanza un error.
            if (!response.ok) {
                localStorage.removeItem('token')
                router.push('/login')
            }
            //console.log("RESPUESTA",    response)
            const data = await response.json();

            const actividadesFormateadas = data.data.map(actividad => ({
                id: actividad._id, // Reemplaza 'id' con la propiedad correcta
                titulo: actividad.nombre, // Reemplaza 'titulo' con la propiedad correcta
                fecha: actividad.horarios, // Reemplaza 'fecha' con la propiedad correcta
            }));
            //console.log("ACTIVIDADES FORMATEADAS", actividadesFormateadas)
            //console.log("DATA.DATA", data.data)
            setActividades(data.data)

            return actividadesFormateadas;
        }catch(error){

            console.error("Error al cargar las actividades apuntado: ", error)
        }
    };


    const generarDiasDelMesConActividades = (ano, mes, actividades) => {
        const diasEnMes = new Date(ano, mes, 0).getDate();
        
        const fechasActividades = []
        for (let i = 0; i < actividades.length; i++) {
            fechasActividades.push(actividades[i].fecha.split(" ")[0])
        }
        // console.log("fechasActividades: ", fechasActividades)

        const dias = [];
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const diaFormateado = `${dia}/${mes}/${ano}`;
            const actividadesDelDia = actividades.filter((actividad, index) => {
                return fechasActividades[index] === diaFormateado;
            });
            dias.push({
                dia,
                actividades: actividadesDelDia,
            });
        }
        return dias;
    };
    // este hook se ejecuta cuando se monta el componente
    useEffect(() => {
        const fetchAndGenerate = async () => {
            const actividadesUser = await fetchActividadesUser();
            const fechaActual = new Date();
            const anoActual = fechaActual.getFullYear()
            const mesActual = fechaActual.getMonth() 
            
            const diasMesActividades = generarDiasDelMesConActividades(anoActual, mesActual+1, actividadesUser)         
            setActividadesDelMes(diasMesActividades)
            setActividadesFormateadas(actividadesUser)
            setAno(anoActual)
            setMes(mesActual)
        };
    
        fetchAndGenerate();
    }, [setActividadesDelMes, setActividadesFormateadas, setAno, setMes]);

    // useEffect(() => {
    //     console.log("HOOK Actividades", actividadesDelMes);
    // }, [actividadesDelMes]);

    const mesAnterior = useCallback(() => {
        const nuevoMes = mes === 0 ? 11 : mes - 1;
        const nuevoAno = mes === 0 ? ano - 1 : ano;
    
        setMes(nuevoMes);
        setAno(nuevoAno);
    
        const actividadesNuevoMes = generarDiasDelMesConActividades(nuevoAno, nuevoMes + 1, actividadesFormateadas);
        setActividadesDelMes(actividadesNuevoMes);
    }, [mes, ano, actividadesFormateadas, generarDiasDelMesConActividades]);
    
    const mesSiguiente = useCallback(() => {
        const nuevoMes = mes === 11 ? 0 : mes + 1;
        const nuevoAno = mes === 11 ? ano + 1 : ano;
    
        setMes(nuevoMes);
        setAno(nuevoAno);
    
        const actividadesNuevoMes = generarDiasDelMesConActividades(nuevoAno, nuevoMes + 1, actividadesFormateadas);
        setActividadesDelMes(actividadesNuevoMes);
    }, [mes, ano, actividadesFormateadas, generarDiasDelMesConActividades]);

    const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const nombreMes = nombresMeses[mes];

    const primerDiaDelMes = new Date(ano, mes, 1).getDay();
    const espaciosVacios = new Array(primerDiaDelMes).fill(null);

    return (
        <div className='bg-red-300 flex flex-grow flex-col'>
            <div className='mb-3 flex justify-between items-center p-3'>
                <button onClick={mesAnterior} className='mr-2'>
                    ANTERIOR
                </button>
                <p className='text-2xl'>{nombreMes} {ano}</p>
                <button onClick={mesSiguiente} className='ml-2'>
                    SIGUIENTE
                </button>
            </div>

            <div className="grid grid-cols-7 ">
                {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((diaSemana, index) => (
                    <div className='text-center h-5' key={index}>{diaSemana}</div>
                ))}
                {espaciosVacios.map((_, index) => (
                    <div key={index} /> // Espacio vacío para los días antes del inicio del mes
                ))}
                {actividadesDelMes.map((dia, index) => (
                    <DiaCalendario key={index} dia={dia} />
                ))}
            </div>
        </div>
    );
};

export default Calendario;