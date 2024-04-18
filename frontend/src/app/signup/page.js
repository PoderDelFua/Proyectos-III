"use client"

import MultiSelect from '@/components/MultiSelect'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BACKEND_URI } from '@/config/env'
import Image from 'next/image';

//Funciona de la siguiente manera:
//1. El usuario llena el formulario con sus datos.
//2. Al hacer clic en el botón "Registrarse", se envía una solicitud POST al servidor con los datos del usuario.
//3. El servidor verifica si el usuario ya existe en la base de datos.
//4. Si el usuario no existe, se crea un nuevo usuario en la base de datos.
//5. El servidor responde con un mensaje de éxito.
//6. El usuario es redirigido a la página de inicio de sesión.

export default function RegisterUser() {
    const router = useRouter()

    const [nombre, setNombre] = useState('')
    const [instrumento, setInstrumento] = useState([])
    const [gustoMusical, setGustoMusical] = useState([])
    const [bio, setBio] = useState('')
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        // user es un objeto que contiene los datos del usuario, que se enviará al servidor.
        const user = {
            nombre,
            instrumento,
            gusto_musical: gustoMusical,
            bio,
            correo,
            password,
            nickname
        }
        // userExistsResponse es la respuesta del servidor a la solicitud POST para verificar si el usuario ya existe.
        const userExistsResponse = await fetch(`${BACKEND_URI}/usuario/checkUserExists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, nickname}),
        })
        

        const data = await userExistsResponse.json()
        // Si el usuario ya existe, se muestra un mensaje de error.
        if (data.status == 500) {
            alert(data.message)
            return
        } else if (data.exists) {
            alert("The user with this email/nickname already exists")
            return
        }
        // Si el usuario no existe, se crea un nuevo usuario en la base de datos.
        fetch(`${BACKEND_URI}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
        //Si no hay errores, el usuario es redirigido a la página de inicio de sesión.
        router.push('/login')
    }
    //opciones instrumentos
    var instrumentoOptions = ['Flauta travesera', 'Flauta', 'Clarinete', 'Saxofón', 'Trompeta', 'Trombón', 'Trompa', 'Tuba', 'Oboe', 'Fagot', 'Guitarra acústica', 'Guitarra eléctrica', 'Guitarra clásica', 'Bajo eléctrico', 'Violín', 'Viola', 'Violonchelo', 'Contrabajo', 'Ukelele', 'Banjo', 'Piano/Teclado eléctrico', 'Batería', 'Xilófono', 'Cajón']

    //opciones niveles
    var nivelOptions = ['Principiante', 'Medio', 'Avanzado']

    //opciones generos musicales
    var generosOptions = ['Rock', 'Jazz', 'Música clásica', 'Pop', 'Metal']

    //Todos los campos funcionan igual, por ejemplo, el campo "nombre" se actualiza con el valor del 
    //campo de entrada correspondiente. Se utiliza el método "setNombre" para actualizar el estado del campo "nombre".
    //Y al hacer clic en el botón "Registrarse", se llama a la función "handleSubmit" que envía los datos del usuario al servidor.
    return (
        <section>
            <div className="h-screen flex justify-start">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/fondo-login.png" 
                        alt="Imagen de fondo"
                        layout="fill"
                        objectFit="cover" 
                        quality={100}
                    />
                </div>
            
                <div className="w-full md:w-1/2 lg:w-2/5 z-10 p-4 md:p-8">
                    
                    <div className="bg-white shadow-xl rounded-lg p-6 custom-container-login">

                    <div>
                        <h1 htmlFor="titulo" className="text-center text-gray-3000 font-bold text-4xl">Registro</h1>
                    </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="nombre" className="block text-gray-800 font-bold">Nombre completo:</label>
                                <input onChange={(e) => setNombre(e.target.value)} type="text" name="nombre" id="nombre" placeholder="John Doe" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600 custom-rectangulo"  />
                            </div>

                            <div className="mb-6">
                                <MultiSelect
                                    formFieldName={"instrumento"}
                                    options={instrumentoOptions}
                                    onChange={(selectedOptions) => setInstrumento(selectedOptions.map(option => ({ nombre: option, niveles: [] })))} 
                                    prompt="Seleccione su/s Instrumento/os" />
                            </div>

                            <div className="mb-6">
                                <MultiSelect
                                        formFieldName={"gustoMusical"}
                                        options={generosOptions}
                                        onChange={(selectedOptions) => setGustoMusical(selectedOptions)} 
                                        prompt="Seleccione los géneros musicales que te interesen" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="bio" className="block text-gray-800 font-bold">Biografía:</label>
                                <textarea onChange={(e) => setBio(e.target.value)} name="bio" id="bio" rows="3" placeholder="Cuéntanos algo sobre ti..." className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600 custom-rectangulo" ></textarea>
                            </div>

                            {instrumento.map((inst, index) => (
                                <div key={inst.nombre} className="mb-6">
                                <MultiSelect
                                    formFieldName={`nivel_${inst.nombre}`}
                                    options={nivelOptions}
                                    value={inst.niveles}
                                    onChange={(selectedOptions) => {
                                    const newInstrumento = instrumento.map((instrumento, idx) => {
                                        if (index === idx) {
                                        return { ...instrumento, nivel: selectedOptions }
                                        }
                                        return instrumento
                                    })
                                    setInstrumento(newInstrumento)
                                    }}
                                    prompt={`Seleccione el nivel para ${inst.nombre}`}
                                />
                                </div>
                            ))
                            }

                            
                            <div className="mb-6">
                                <label htmlFor="nickname" className="block text-gray-800 font-bold">Nickname:</label>
                                <input onChange={(e) => setNickname(e.target.value)} type="text" name="nickname" id="nickname" placeholder="Tu apodo" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600 custom-rectangulo"  />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="correo" className="block text-gray-800 font-bold">Email:</label>
                                <input onChange={(e) => setCorreo(e.target.value)} type="email" name="correo" id="correo" placeholder="tucorreo@dominio.com" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600 custom-rectangulo"  />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-800 font-bold">Contraseña:</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="contraseña" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600 custom-rectangulo"  />
                            </div>

                            <div className="mb-4">
                                <Link href="/login" className="text-sm font-thin-black text-gray-800 hover:underline inline-block hover:text-indigo-600">
                                    ¿Ya tienes una cuenta?
                                </Link>
                            </div>

                            <div className="flex justify-center mb-8">
                                <button type="submit" className="cursor-pointer py-2 px-4 text-white font-bold w-1/2 rounded custom-cancel-button">
                                    Registrarse
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}