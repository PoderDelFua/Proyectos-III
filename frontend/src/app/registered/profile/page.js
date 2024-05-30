"use client"

import Sidebar from '@/components/Sidebar'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {BACKEND_URI} from '@/config/env'
import { PencilIcon } from '@heroicons/react/24/solid';
import ActivityCard from "@/components/ActivityCard";
import { set } from 'js-cookie'

import Loading from '@/components/Loading';


export default function UserProfile() {
    const router = useRouter()
    const [userData, setUserData] = useState(null)
    const [nombre, setNombre] = useState('')
    const [instrumento, setInstrumento] = useState([])
    const [gustoMusical, setGustoMusical] = useState([])
    const [bio, setBio] = useState('')
    const [nickname, setNickname] = useState('')
    const [pagesData, setPagesData] = useState(null)
    const [activityCards, setActivityCards] = useState([])
    const [selectedTab, setSelectedTab] = useState('Publicaciones')
    const [favoritos, setFavoritos] = useState([])
    const [like, setLike] = useState(false);

    const [actividadesFav, setActividadesFav] = useState([]);
    const [actividadesApuntado, setActividadesApuntado] = useState([]);
    const [mensajesUsuario, setMensajesUsuario] = useState([]);
    
    const [hoveredTab, setHoveredTab] = useState(null);

    const handleMouseEnter = (tab) => {
        setHoveredTab(tab);
    };

    const handleMouseLeave = () => {
        setHoveredTab(null);
    };


    let setParametrosData = {
        nombre: '',
        instrumento:  [],
        gustoMusical:  [],
        bio:  '',
        nickname: '',
        id: ''
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.push('/login')
            return
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URI}/usuario/getUserData`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                if (!response.ok) {
                    localStorage.removeItem('token')
                        router.push('/login')
                }
                console.log("Buscando datos del usuario...")
                const data = await response.json()
                setParametrosData = {
                    nombre: data.data.nombre,
                    instrumento:  data.data.instrumento,
                    gustoMusical:  data.data.gusto_musical,
                    bio:  data.data.bio,
                    nickname: data.data.nickname,
                    favoritos: data.data.favoritos,
                    id: data.data._id
                }
                console.log(`Data (profile page): ${data.data}`)
                setUserData(setParametrosData)
            } catch (error) {
                console.error("Error al cargar la información del usuario: ", error)
            }
            try{
                console.log("Buscando actividades del usuario...", setParametrosData.id)
                const response2 = await fetch(`${BACKEND_URI}/actividades/getActivityDataByUser/${setParametrosData.id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                if (!response2.ok) {
                    throw new Error('No se pudo cargar las actividades del usuario')
                }
                console.log("Buscando datos del usuario...")
                const data2 = await response2.json()
                console.log(`Data (profile page): ${data2.data}`, data2.data)
                setPagesData(data2.data)
                setActivityCards(data2.data)
            }catch (error) {
                console.error("Error al cargar las actividades del usuario: ", error)
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
            setFavoritos(userData.favoritos)
            fetchActividadesUserApuntado()
            fetchActividadesUserFav()
            fetchRespuestasUser()
        }
    }, [userData])
    
    if (!userData) {
        // return <div>Cargando...</div>
        return <Loading/>;
    }


    const fetchActividadesUserApuntado = async () => {
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

            setActividadesApuntado(data.data)

            return data.data;
        }catch(error){

            console.error("Error al cargar las actividades apuntado: ", error)
        }
    };

    const fetchRespuestasUser = async () => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.push('/login')
            return
        }
        try{
            console.log("Buscando mensajes usuario...", setParametrosData.id)
            const response = await fetch(`${BACKEND_URI}/mensajes/getMensajesUserTok`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            //Si la respuesta no es correcta, se lanza un error.
            if (!response.ok) {
                localStorage.removeItem('token')
                router.push('/login')
            }
            console.log("RESPUESTA",    response)
            const data = await response.json();

            setMensajesUsuario(data)
            console.log(data)

            return data;
        }catch(error){

            console.error("Error al cargar las respuestas del usuario: ", error)
        }
    };

    const fetchActividadesUserFav = async () => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.push('/login')
            return
        }
        try{
            const response = await fetch(`${BACKEND_URI}/actividades/getActividadesFav`, {
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

            setActividadesFav(data.data)

            return data.data;
        }catch(error){

            console.error("Error al cargar las actividades fav: ", error)
        }
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        if (tab === 'Favoritos' && pagesData) {
            const filteredPages = actividadesFav
            //const filteredPages = pagesData.filter(page => favoritos.includes(page._id))
            setActivityCards(filteredPages)
        } else if (tab === 'Actividades' && pagesData) {
            const activApuntado = actividadesApuntado
            setActivityCards(activApuntado)
        } else if( tab === 'Publicaciones' && pagesData){
            
        } else if(pagesData){
            setActivityCards(pagesData)
        }        
    };

    let tabContent;
    switch (selectedTab) {
        case 'Publicaciones':
            tabContent = (
                <div className="custom-grid-itemActividad">
                    {activityCards.map(page => (
                        <div key={page._id} className="custom-page-card">
                            <ActivityCard
                                activity={page}
                                userId=''
                                userName=''
                                foto='../bg.jpg'
                            />
                        </div>
                    ))}
                </div>
            );
            break;
        case 'Respuestas':
            tabContent = (
                <div>
                    {mensajesUsuario.map((mensaje) => (
                        <div key={mensaje._id}>
                            <a href={`/foro/${mensaje.hiloId._id}`} className="block">
                                <h1 className="font-bold text-xl truncate mb-2">{mensaje.hiloId.titulo}</h1>
                                <hr className="border-black mb-4" />
                                <div className="relative p-4 rounded-lg flex items-center ml-8 custom-bg-color2 mb-8 mt-8">
                                    <div className="flex flex-col items-center" style={{ flexShrink: 0 }}>
                                        <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
                                            <img src="/no-profile.png" alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-gray-600 text-sm">@{mensaje.autorMensaje.nombre}</p>
                                    </div>
                                    <div className="ml-4" style={{ maxWidth: 'calc(100% - 5rem)', flexBasis: 'auto' }}>
                                        <p className="text-gray-800">{mensaje.mensaje}</p>
                                    </div>
                                    <p className="absolute bottom-0 right-0 mb-2 mt-2 mr-10">{mensaje.likes}</p>
                                    <button
                                        onClick={() => setLike(!like)}
                                        className="absolute bottom-0 right-0 mb-2 mt-2 mr-2 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            fill="#0065EF"
                                            className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                        </svg>
                                    </button>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            );
            break;
        case 'Actividades':
            tabContent = (
                <div className="custom-grid-itemActividad">
                    {activityCards.map(page => (
                        <div key={page._id} className="custom-page-card">
                            <ActivityCard
                                activity={page}
                                userId=''
                                userName=''
                                foto='../bg.jpg'
                            />
                        </div>
                    ))}
                </div>
            );
            break;
        case 'Favoritos':
            tabContent = (
                <div className="custom-grid-itemActividad">
                    {activityCards.map(page => (
                        <div key={page._id} className="custom-page-card">
                            <ActivityCard
                                activity={page}
                                userId=''
                                userName=''
                                foto='../bg.jpg'
                            />
                        </div>
                    ))}
                </div>
            );
            break;
        default:
            tabContent = null;
    }
    //Página de perfil del usuario logeado. Se muestran datos relevantes del usuario como su nombre, nickname, biografía, instrumentos
    //y sus respectivos niveles. En esta página aparece el botón que redirecciona a /registered/modify para modiciar los datos del usuario.
    //También hay una sección donde aparece las actividades publicadas por el usuario, las respuestas del foro(falta por implementar), las 
    //actividades las cuales está unido(falta por implementar), y sus actividades favoritas(falta por implementar)
    return (
        <div className="flex min-h-screen">
            <div className="w-48">
                <Sidebar selectedTab="profile"/>
            </div>
            <div className="flex flex-1 flex-col min-h-screen bg-white">
                <div className="relative">
                    <img src="/fondo-login.png" alt="Background" className="w-full h-48 object-cover" />
                    <div className="absolute pl-20 top-32 left-8">
                        <div className="w-32 h-32 rounded-full border-8 border-white overflow-hidden">
                            <img src="/no-profile.png" alt="Profile" />
                        </div>
                    </div>
                </div>

                <div className="px-8 py-6 pl-32 mt-16">
                    <Link href="/registered/modify"
                          className="absolute top-48 right-4 mt-8 mr-8 px-4 py-2 bg-white text-gray-800 border border-gray-400 rounded-xl flex items-center space-x-2 
                          transition transform hover:border-indigo-600 hover:text-white hover:bg-blue active:bg-indigo-600">
                        <PencilIcon className="h-4 w-4"/>
                        <span>Editar perfil</span>
                    </Link>
                    <h2 className="text-2xl font-bold">{nombre}</h2>
                    <p className="text-gray-600">@{nickname}</p>
                    <p className="mt-4">{bio}</p>

                    <div className="mt-4">
                        <span className="font-bold">Instrumentos:</span>
                        {instrumento.map((item, index) => (
                            <span key={index} className="ml-2">
                                | {item.nombre} - Nivel {item.nivel}
                            </span>
                        ))}
                    </div>
                    
                    <div className="flex flex-wrap justify-between mt-8 mb-4">
            <div className="relative">
                <button 
                    className={`text-2xl font-bold w-full sm:w-auto relative transition transform hover:text-black ${selectedTab === 'Publicaciones' ? 'border-b-2 border-black text-black' : 'text-zinc-500'}`} 
                    onClick={() => handleTabChange('Publicaciones')}
                    onMouseEnter={() => handleMouseEnter('Publicaciones')}
                    onMouseLeave={handleMouseLeave}
                >
                    Publicaciones
                    <div className={`absolute inset-x-0 h-1 bg-black origin-center transform transition-transform duration-300 ${hoveredTab === 'Publicaciones' ? 'scale-x-100' : 'scale-x-0'}`}></div>
                </button>
            </div>
            <div className="relative">
                <button 
                    className={`text-2xl font-bold w-full sm:w-auto relative transition transform hover:text-black ${selectedTab === 'Respuestas' ? 'border-b-2 border-black text-black' : 'text-zinc-500'}`} 
                    onClick={() => handleTabChange('Respuestas')}
                    onMouseEnter={() => handleMouseEnter('Respuestas')}
                    onMouseLeave={handleMouseLeave}
                >
                    Respuestas
                    <div className={`absolute inset-x-0 h-1 bg-black origin-center transform transition-transform duration-300 ${hoveredTab === 'Respuestas' ? 'scale-x-100' : 'scale-x-0'}`}></div>
                </button>
            </div>
            <div className="relative">
                <button 
                    className={`text-2xl font-bold w-full sm:w-auto relative transition transform hover:text-black ${selectedTab === 'Actividades' ? 'border-b-2 border-black text-black' : 'text-zinc-500'}`} 
                    onClick={() => handleTabChange('Actividades')}
                    onMouseEnter={() => handleMouseEnter('Actividades')}
                    onMouseLeave={handleMouseLeave}
                >
                    Actividades
                    <div className={`absolute inset-x-0 h-1 bg-black origin-center transform transition-transform duration-300 ${hoveredTab === 'Actividades' ? 'scale-x-100' : 'scale-x-0'}`}></div>
                </button>
            </div>
            <div className="relative">
                <button 
                    className={`text-2xl font-bold w-full sm:w-auto relative transition transform hover:text-black ${selectedTab === 'Favoritos' ? 'border-b-2 border-black text-black' : 'text-zinc-500'}`} 
                    onClick={() => handleTabChange('Favoritos')}
                    onMouseEnter={() => handleMouseEnter('Favoritos')}
                    onMouseLeave={handleMouseLeave}
                >
                    Favoritos
                    <div className={`absolute inset-x-0 h-1 bg-black origin-center transform transition-transform duration-300 ${hoveredTab === 'Favoritos' ? 'scale-x-100' : 'scale-x-0'}`}></div>
                </button>
            </div>
        </div>

                    {tabContent}
                </div>
            </div>
        </div>
    )
}