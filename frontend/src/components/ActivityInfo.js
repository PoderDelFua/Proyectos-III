"use client"

import React from 'react';

function ActivityInfo({ onClose }) {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg">
            {/* Your expanded content */}
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
                Cerrar
            </button>
        </div>
    );
}

export default ActivityInfo;