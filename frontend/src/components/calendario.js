import React, { useState, useCallback } from 'react';
import DiaCalendario from './DiaCalendario';

const Calendario = () => {
    const [mes, setMes] = useState(new Date().getMonth()); // Mes actual

    const mesAnterior = useCallback(() => {
        setMes(mesActual => mesActual === 0 ? 11 : mesActual - 1);
    }, []);

    const mesSiguiente = useCallback(() => {
        setMes(mesActual => mesActual === 11 ? 0 : mesActual + 1);
    }, []);

    const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const nombreMes = nombresMeses[mes];

    const diasEnMes = new Date(new Date().getFullYear(), mes + 1, 0).getDate();
    const dias = Array.from({ length: diasEnMes }, (_, i) => i + 1);
    const primerDiaMes = new Date(new Date().getFullYear(), mes, 1).getDay();
    const espaciosVacios = Array.from({ length: primerDiaMes }, () => null);
    const diasConEspacios = [...espaciosVacios, ...dias];

    return (
        <div>
            <div className='mb-3 flex justify-between items-center'>
                <button onClick={mesAnterior} className='mr-2'>
                    ANTERIOR
                </button>
                <p className='text-2xl'>{nombreMes}</p>
                <button onClick={mesSiguiente} className='ml-2'>
                    SIGUIENTE
                </button>
            </div>

            <div className="grid grid-cols-7 ">
                {diasConEspacios.map((dia, index) => dia ? (
                    <DiaCalendario key={index} dia={dia} texto={`Actividades del día ${dia}`} />
                ) : (
                    <div key={index} /> // Espacio vacío para los días antes del inicio del mes
                ))}
            </div>
        </div>
    );
};

export default Calendario;