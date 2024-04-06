"use client"

import MultiSelect from '@/components/MultiSelect'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URI } from '@/config/env'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function CreateActivity({ isOpen, closePopup }) {
    const router = useRouter()
    const [userData, setUserData] = useState(null)
    const [nombre, setNombre] = useState('')
    const [instrumento, setInstrumento] = useState([])
    const [descripcion, setDescripcion] = useState('')
    const [horarios, setHorarios] = useState(null)
    const [auxHorarios, setAuxHorarios] = useState('')
    const [foto, setFoto] = useState(null)
    const [creadoPor, setCreadoPor] = useState('')
    const [activityData, setActivityData] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.push('/login')
            return
        }
        const fetchData = async () => {
            try {
                //El GET tiene una cabecera distinta, ya que necesitamos enviar el token
                //para verificar si el usuario está autenticado.
                const response = await fetch(`${BACKEND_URI}/usuario/getUserData`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                //Si la respuesta no es correcta, se lanza un error.
                if (!response.ok) {
                    localStorage.removeItem('token')
                    console.log("No se pudo cargar la información del usuario")
                    router.push('/login')
                }
                console.log("Buscando datos del usuario...")
                const data = await response.json()
                console.log(data)
                //Aqui guardamos la información del usuario en el estado userData.
                setUserData(data.data)
                setCreadoPor(data.data._id)
            } catch (error) {
                console.error("Error al cargar la información del usuario: ", error)
            }
        }

        fetchData()
    }, [])
    useEffect(() => {
        console.log('auxHorarios ha cambiado:', auxHorarios)
    }, [auxHorarios]);
    const handleDateChange = (newValue) => {
        const dateTime = new Date(newValue);
        const formattedDate = dateTime.toLocaleDateString();
        const formattedTime = dateTime.toLocaleTimeString();

        console.log("Date: ", formattedDate);
        console.log("Time: ", formattedTime);

        const dateTimeString = `${formattedDate} ${formattedTime}`;
        setAuxHorarios(dateTimeString);
    };

    const handleTimeChange = (newTime) => {

        const time = new Date(newTime);
        let time2 = time.toLocaleTimeString();
        let timeMix = auxHorarios + ' ' + time2;
        setAuxHorarios(timeMix)
//Modificar a hora y dia separado
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
/* Otra forma
        const formData = new FormData()

        formData.append('foto', foto)
        formData.append('nombre', nombre)
        formData.append('instrumento', instrumento)
        formData.append('descripcion', descripcion)
        formData.append('horarios', JSON.stringify(horarios))
        formData.append('creadoPor', creadoPor)
*/
        const formData = new FormData();
        formData.append('image', foto);
        try {
            // Primero subimos la foto
            const responseFoto = await fetch(`${BACKEND_URI}/storage/postImg`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            if (!responseFoto.ok) {
                throw new Error('Error al subir la imagen');
            }

            const fotoData = await responseFoto.json();
            const fotoId = fotoData._id; // Asumiendo que la respuesta contiene un _id

            const activityData = {
                foto: fotoId,
                nombre: nombre,
                instrumento: instrumento,
                descripcion: descripcion,
                horarios: auxHorarios,
                creadoPor: creadoPor
            }
            console.log("Creando actividad...")
            console.log(activityData)
            const response = await fetch(`${BACKEND_URI}/actividades/createActivity`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityData)
            })

            if (!response.ok) {
                throw new Error('Error al crear la actividad')
            }
            const data = await response.json()
            console.log(data)
            //Reload page
            closePopup()

        } catch (error) {
            console.error("Error al crear la actividad: ", error)
        }
    }
    const handleFotoChange = (e) => {
        setFoto(e.target.files[0])
    }

    var instrumentoOptions = ['Flauta travesera', 'Flauta', 'Clarinete', 'Saxofón', 'Trompeta', 'Trombón', 'Trompa', 'Tuba', 'Oboe', 'Fagot', 'Guitarra acústica', 'Guitarra eléctrica', 'Guitarra clásica', 'Bajo eléctrico', 'Violín', 'Viola', 'Violonchelo', 'Contrabajo', 'Ukelele', 'Banjo', 'Piano/Teclado eléctrico', 'Batería', 'Xilófono', 'Cajón']

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
                                        Crear nueva actividad
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit}
                                              className="space-y-6 bg-white p-6 rounded-md shadow-md">
                                            <div>
                                                <label htmlFor="foto"
                                                       className="block text-sm font-medium text-gray-700">Añadir una
                                                    foto:</label>
                                                <input type="file" name="foto" onChange={handleFotoChange}
                                                       className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
                                            </div>
                                            <div>
                                                <label htmlFor="nombre"
                                                       className="block text-sm font-medium text-gray-700">Nombre de la
                                                    actividad:</label>
                                                <input value={nombre} onChange={(e) => setNombre(e.target.value)}
                                                       type="text" name="nombre"
                                                       className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                       placeholder="Nombre"/>

                                            </div>
                                            <div>
                                                <label htmlFor="descripcion"
                                                       className="block text-sm font-medium text-gray-700">Breve
                                                    descripción:</label>
                                                <textarea value={descripcion}
                                                          onChange={(e) => setDescripcion(e.target.value)}
                                                          name="descripcion"
                                                          className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[150px]"
                                                          placeholder="Descripción de la actividad"/>
                                            </div>
                                            <div>
                                                <label htmlFor="instrumento"
                                                       className="block text-sm font-medium text-gray-700">Seleccione un
                                                    instrumento:</label>
                                                <MultiSelect formFieldName={"instrumento"} options={instrumentoOptions}
                                                             onChange={(option) => setInstrumento(option)}
                                                             prompt="Seleccione un instrumento"/>
                                            </div>

                                            <div>
                                                <label htmlFor="horarios"
                                                       className="block text-sm font-medium text-gray-700">Seleccione
                                                    una fecha y hora:</label>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker
                                                        label="Selecciona una fecha y hora"
                                                        value={horarios}
                                                        onChange={handleDateChange}
                                                        renderInput={(params) => <input {...params}
                                                                                        className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                            <div>
                                                <button type="submit"
                                                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-500">
                                                    Publicar actividad
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
    )
}