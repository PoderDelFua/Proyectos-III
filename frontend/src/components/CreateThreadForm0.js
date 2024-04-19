import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BACKEND_URI } from '@/config/env';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function CrearThreadForm({ isOpen, closePopup }) {
    const router = useRouter();
    const [titulo, setTitulo] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [privado, setPrivado] = useState(false);
    const [creadoPor, setCreadoPor] = useState('');


    useEffect(() => {
      const userId = localStorage.getItem('userId');
      if (userId) {
          setCreadoPor(userId);
      }
  }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const threadData = {
                titulo: titulo,
                descripcion: descripcion,
                creadoPor: creadoPor,
                privado: privado,
            };


            const response = await fetch(`${BACKEND_URI}/hilo/tok`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(threadData),
            });
            if (!response.ok) {
                throw new Error('Error al crear el hilo');
            }

            const data = await response.json();
            console.log('Hilo creado:', data);

            closePopup();
        } catch (error) {
            console.error('Error al crear el hilo:', error);
        }
    };

    return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closePopup}>
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
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div>
                            <div className="mt-3 text-center sm:mt-5">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                    Nuevo Hilo
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-md shadow-md">
                                        <div>
                                            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título del Hilo</label>
                                            <input
                                                value={titulo}
                                                onChange={(e) => setTitulo(e.target.value)}
                                                type="text"
                                                name="titulo"
                                                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="Título"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción del Hilo</label>
                                            <textarea
                                                value={descripcion}
                                                onChange={(e) => setDescripcion(e.target.value)}
                                                name="descripcion"
                                                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="Descripción"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-500"
                                            >
                                                Crear Hilo
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button type="button" className="absolute top-0 right-0 mr-4 mt-4" onClick={closePopup}>
                                <span className="sr-only">Cerrar</span>
                                {/* Icono de cierre X */}
                            </button>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
      </Transition.Root>
  
    );
}
