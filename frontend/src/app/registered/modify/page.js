"use client"

import MultiSelect from '@/components/MultiSelect'
import Sidebar from '@/components/Sidebar'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {BACKEND_URI} from '@/config/env'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DesktopTimePicker} from "@mui/x-date-pickers/DesktopTimePicker";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";

import { XMarkIcon } from '@heroicons/react/24/outline';
import MultiSelect2 from '@/components/MultiSelect2'


export default function UpdateUser() {
    const router = useRouter()
    const [userData, setUserData] = useState(null)
    const [nombre, setNombre] = useState('')
    const [instrumento, setInstrumento] = useState([])
    const [gustoMusical, setGustoMusical] = useState([])
    const [bio, setBio] = useState('')
    const [nickname, setNickname] = useState('')

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
                    router.push('/login')
                }
                console.log("Buscando datos del usuario...")
                const data = await response.json()
                console.log(data)
                //Aqui guardamos la información del usuario en el estado userData.
                setUserData(data.data)
            } catch (error) {
                console.error("Error al cargar la información del usuario: ", error)
            }
        }

        fetchData()
    }, [])
    
    useEffect(() => {
        if (userData) {
            setNombre(userData.nombre)
            setInstrumento([...userData.instrumento])
            setGustoMusical(userData.gusto_musical)
            setBio(userData.bio)
            setNickname(userData.nickname)
        }
    }, [userData])

    if (!userData) {
        return <div>Cargando...</div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        //Se asignan los valores de user por si no se actualizan los campos que se envien los que ya tenia
        const user = {
            id: userData._id,
            nombre: nombre || userData.nombre,
            instrumento: instrumento || userData.instrumento,
            gusto_musical: gustoMusical || userData.gusto_musical,
            bio: bio || userData.bio,
            correo: userData.correo,
            nickname: nickname || userData.nickname
        };

        try {
            console.log(user)
            const response = await fetch(`${BACKEND_URI}/usuario/updateUserData`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                router.push(`/home`)
            } else {
                const errorData = await response.text();
                console.error('Error during update operation:', errorData);
            }
        } catch (error) {
            console.error('Error during update operation:', error);
        }
    }

    var instrumentoOptions = ['Flauta travesera', 'Flauta', 'Clarinete', 'Saxofón', 'Trompeta', 'Trombón', 'Trompa', 'Tuba', 'Oboe', 'Fagot', 'Guitarra acústica', 'Guitarra eléctrica', 'Guitarra clásica', 'Bajo eléctrico', 'Violín', 'Viola', 'Violonchelo', 'Contrabajo', 'Ukelele', 'Banjo', 'Piano/Teclado eléctrico', 'Batería', 'Xilófono', 'Cajón']
    var nivelOptions = ['Principiante', 'Medio', 'Avanzado']
    var generosOptions = ['Rock', 'Jazz', 'Música clásica', 'Pop', 'Metal']

    return (
        <section>
            <title>hola</title>
            <Sidebar selectedTab="profile"/>
            <div className="relative">
                <img src="/fondo-login.png" alt="Background" className="w-full h-48 object-cover" />
                <div className="absolute pl-20 top-32 left-8"></div>
            </div>
            {/* <div className="flex flex-col">
                <hr className="border-[1.7px] border-black my-10" /> pr-[500px]
            </div> */}
            <div className="min-h-screen bg-white flex justify-end">
                <div className="w-full xl:w-5/6 lg:w-9/12 md:w-9/12 sm:w-screen py-6 px-8 my-0 bg-white rounded-3xl">
                    <form onSubmit={handleSubmit}>
                        <hr className="border-[1.7px] border-black my-2" />
                        <div className="flex items-center">
                            <label for="nombre" class="block text-gray-800 font-bold mr-[169px]">Nombre</label>
                            <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" name="nombre" id="nombre" placeholder="John Doe" className="w-full border border-white py-2 pl-3 
                            rounded-lg outline-none border-2 transition-all hover:border-indigo-300 hover:bg-indigo-100 transition-all focus:border-4 focus:border-indigo-600"/>
                        </div>

                        <hr className="border-[1.7px] border-black my-2" />
                        <div className="flex items-center">
                            <label htmlFor="nickname" className="block text-gray-800 font-bold mr-[153px]">Nickname</label>
                            <input value={nickname} onChange={(e) => setNickname(e.target.value)} type="text"
                                   name="nickname" id="nickname" placeholder="Tu apodo"
                                   className="w-full border border-white py-2 pl-3 
                                   rounded-lg outline-none border-2 transition-all hover:border-indigo-300 hover:bg-indigo-100 transition-all focus:border-4 focus:border-indigo-600"/>
                        </div>

                        <hr className="border-[1.7px] border-black my-2" />             
                        <div class="flex items-center">
                            <label for="bio" class="block text-gray-800 font-bold mr-[137px] self-start mt-2">Biografía</label>
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} name="bio" id="bio" rows="3" placeholder="Cuéntanos algo sobre ti..." class="w-full ml-6 border border-white py-2 pl-3 
                            rounded-lg outline-none border-2 transition-all hover:border-indigo-300 hover:bg-indigo-100 transition-all focus:border-4 focus:border-indigo-600"></textarea>
                        </div>
                        <hr className="border-[1.7px] border-black my-2" />
                        <div class="flex items-center">
                            <label for="password" class="block text-gray-800 font-bold mr-[140px]">Contraseña</label>
                            <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" name="nombre" id="nombre" placeholder="John Doe" class="w-full border border-white py-2 pl-3 
                            rounded-lg outline-none border-2 transition-all hover:border-indigo-300 hover:bg-indigo-100 transition-all focus:border-4 focus:border-indigo-600"/>
                        </div>
                        <hr className="border-[1.7px] border-black my-2" />
                        <div className="flex items-center">
                            <label htmlFor="instrumentos" className="block text-gray-800 font-bold mr-[110px] my-6">Instrumentos</label>
                            <div className="text-gray-800 grid grid-cols-2 gap-x-4 gap-y-4 pl-4">
                                {instrumento.map((inst, index) => (
                                <div key={inst.nombre} className="flex items-center justify-between bg-blue p-1 rounded-lg text-white">
                                    <span>{inst.nombre}</span>
                                    <button
                                        type="button"
                                        className="text-white transition-all rounded hover:bg-white hover:text-blue ml-2 focus:outline-none flex-shrink-0"
                                        onClick={() => setInstrumento(prev => prev.filter((_, i) => i !== index))}
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}

                            </div>
                            <div className="ml-auto">
                                <MultiSelect2 
                                    formFieldName={"instrumento"}
                                    options={instrumentoOptions}
                                    onChange={(selectedOptions) => setInstrumento(selectedOptions.map(option => ({
                                        nombre: option,
                                        nivel: []
                                    })))}
                                    prompt=""
                                    className=""/>
                            </div>
                        </div>

                        <hr className="border-[1.7px] border-black my-2" />
                        <div className="flex items-center">
                        <label htmlFor="nivel" className="block text-gray-800 font-bold mr-[68px] md:mr-[188px] sm:mr-[188px] my-6">Nivel</label>
                        <div className="text-gray-800 grid grid-cols-2 gap-x-4 gap-y-2 pl-1">
                        {instrumento.map((inst, index) => (
                            <div key={inst.nombre} className="">
                                <MultiSelect
                                    formFieldName={`nivel_${inst.nombre}`}
                                    options={nivelOptions}
                                    value={inst.nivel}
                                    onChange={(selectedOptions) => {
                                        const newInstrumento = instrumento.map((instrumento, idx) => {
                                            if (index === idx) {
                                                return {...instrumento, nivel: selectedOptions};
                                            }
                                            return instrumento;
                                        });
                                        setInstrumento(newInstrumento);
                                    }}
                                    prompt={`${inst.nombre}`}
                                />
                            </div>
                        ))}
                        </div>
                        </div>

                        <hr className="border-[1.7px] border-black my-2" />
                        <div className="flex items-center">
                        <label htmlFor="genero" className="block text-gray-800 font-bold mr-[80px] my-4">Géneros musicales</label>
                        <div>
                            <MultiSelect
                                formFieldName={"gustoMusical"}
                                options={generosOptions}
                                onChange={(selectedOptions) => setGustoMusical(selectedOptions)}
                                prompt="Seleccionar"/>
                        </div>
                        </div>
                        <hr className="border-[1.7px] border-black my-2" />
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker inputFormat="MM/DD/YYYY"/>
                            <DesktopTimePicker inputFormat="hh:mm A"/>
                        </LocalizationProvider> */}
                        

                        <button type="submit"
                                className="cursor-pointer py-2 px-4 block mt-6 bg-blue text-white font-bold w-1/3 text-center rounded-lg transition-all hover:bg-dark-blue active:bg-sidebar-dark-blue-2">Actualizar
                            datos
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
