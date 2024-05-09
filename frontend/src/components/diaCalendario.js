
import React from 'react';

const DiaCalendario = ({ dia }) => {
    return (
        <div className=" bg-white p-4 m-1 h-40 rounded-md">
            <div className='bg-cyan-600 flex items-center justify-center  w-8 h-8  rounded-lg mb-2'>
                <h2 className="font-bold text-l text-center  text-white">{dia.dia}</h2>
            </div>
            <div>
                {dia.actividades.map((actividad, index) => (
                    <div key={index} className="bg-cyan-300 p-1 rounded-md mb-1">
                        <p>{actividad.titulo} {actividad.fecha.split(" ")[1]}</p>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default DiaCalendario;