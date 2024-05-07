import React from 'react';

const DiaCalendario = ({ dia, texto }) => {
    return (
        <div className="border-2 border-black p-4 m-1 flex-grow">
            <h2 className="font-bold text-l mb-2">DIA {dia}</h2>
            <p>{texto}</p>
        </div>
    );
};

export default DiaCalendario;