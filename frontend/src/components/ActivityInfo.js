"use client"

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function ActivityInfo({ isOpen, onClose, page, foto }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
                </Transition.Child>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="inline-block align-bottom bg-primary-gray rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                        <img src={foto} alt="Imagen de la actividad" className="h-56 w-full object-cover mb-4 rounded-lg" />
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{page.nombre}</h2>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600">Creado por @nickname</p>
                            <h3 className="text-lg font-bold">{page.horarios}</h3>
                        </div>
                        <p className="text-gray-700 mb-4">
                            {page.descripcion}
                        </p>
                        {page.instrumento && (
                            <div className="mb-4">
                                <h4 className="text-lg font-bold mb-2">Instrumentos</h4>
                                <ul className="list-disc list-inside">
                                    {page.instrumento.map((item, index) => (
                                        <li>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
  );
}

export default ActivityInfo;