"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BACKEND_URI } from '@/config/env'
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function LoginUser() {
    var token = localStorage.getItem('token')
    if(token){
        localStorage.removeItem('token')
    }
    const router = useRouter()
    //Seteamos el estado de correo y password porque son los datos que vamos a necesitar para iniciar sesión.
    const [correo, setcorreo] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    // El evento handleSubmit se activa cuando el usuario hace clic en el botón "Entrar".
    const handleSubmit = async (e) => {
        e.preventDefault()
        // user es un objeto que contiene los datos del usuario, que se enviará al servidor.
        const user = {
            correo: correo,
            password: password,
        }
        // userExistsResponse es la respuesta del servidor a la solicitud POST para verificar si el usuario ya existe.
        const userExistsResponse = await fetch(`${BACKEND_URI}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, password }),
        })
        // Si el usuario ya existe, se muestra un mensaje de error.        
        if (!userExistsResponse.ok) {
            setError('El usuario o la contraseña no son correctos.')
            return
        }
        // data es la respuesta del servidor a la solicitud POST para verificar si el usuario ya existe.
        //Contiene el token y el usuario que se enviará al servidor.
        //Podemos acceder a las propiedades del objeto usuario para obtener el id del usuario, 
        //Su nombre, correo, nivel, instrumento.. etc. Menos la contraseña que viene encriptada.
        const data = await userExistsResponse.json()
        if (data.usuario) {      
            //Guardamos el token en el localstorage. Se utiliza para verificar si el usuario está autenticado.      
            localStorage.setItem('token', data.token)
            router.push(`/home`)
        } else {
            setError('El usuario o la contraseña no son correctos.')
        }
    }
    //El evento handleCancelClick se activa cuando el usuario hace clic en el botón "Cancelar".
    //Nos redirige a la página principal.
    const handleCancelClick = () => {
        router.push('/')
    }

    //La página de inicio de sesión contiene un formulario con dos campos de entrada: correo y contraseña.
    //Cuando el usuario hace clic en el botón "Entrar", se envía una solicitud POST al servidor con los datos del usuario.
    //El servidor verifica si el usuario ya existe en la base de datos.
    //Si el usuario existe, el servidor responde con un token y el usuario.
    //El token se almacena en el almacenamiento local y el usuario es redirigido a su página de perfil.
    //Es importante que ese token se almacene en el almacenamiento local, ya que se utilizará para verificar si el usuario está autenticado.

    //En resumen, se comporta similar a la página de registro, pero en lugar de crear un nuevo usuario, verifica si el usuario ya existe y si la contraseña es correcta.
    //La contraseña pasa por un desecriptado en el servidor y si es correcta, se devuelve el token y el usuario.
    return (
        <section>
            <form onSubmit={handleSubmit}>  
                <div className="flex flex-col justify-between h-screen">

                    <div className="rounded-lg text-center">  
                        <img src="/fondo-login.png" alt="Background" className="w-full h-48 object-cover" />
                        
                        <div className="m-8">
                            <img src="/LOGO_UTAD.png" alt="Logo" className="mx-auto h-24" />
                        </div>
                
                        <h1 className="text-5xl font-bold mb-4">Bienvenido</h1>
                        
                        <div className="w-28 mx-auto m-6">
                        <Link href="/welcome">
                            <div className="cursor-pointer flex items-center justify-center p-2 rounded-xl bg-blue text-white hover:bg-dark-blue transition duration-200 text-lg">
                                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                                <p className="text-lg">Volver</p>
                            </div>
                        </Link>
                    </div>



                        <div className="mb-6">
                            <input onChange={(e) => setcorreo(e.target.value)} type="correo" name="correo" id="correo" placeholder="Correo de U-tad" style={{ textAlign: 'center' }} className="border border-gray-300 py-2 px-6 rounded outline-none focus:ring-indigo-600 :ring-indigo-600 custom-rectangulo" />
                        </div>
                        <div className="mb-6">
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Contraseña" style={{ textAlign: 'center' }} className="border border-gray-300 py-2 px-6 rounded outline-none focus:ring-indigo-600 :ring-indigo-600 custom-rectangulo" /> 
                            {error && <p className="text-red-500  mt-8 mb-8 text-center">{error}</p>}
                        </div>
                        <div className="mt-10">
                            <button type="submit" className="cursor-pointer bg-light-blue text-blue px-10 py-2 rounded-lg font-semibold hover:bg-dark-blue hover:text-white transition duration-200 text-lg">Iniciar Sesión</button>
                        </div>

                        <p className="mt-10">
                            <Link href="/recover" className="text-blue text-base hover:text-dark-blue transition duration-200">
                                He olvidado mi contraseña
                            </Link>
                        </p>

                    </div>
                    
                    <div className="flex flex-col">
                        <hr className="border-gray-200 my-10" />
                
                        <div className="flex justify-center space-x-8 text-gray-500 text-base pb-6 mb-2">
                            <Link href="#" className="hover:text-gray-800">
                            Contact Us
                            </Link>
                            <Link href="#" className="hover:text-gray-800">
                            About Us
                            </Link>
                            <Link href="#" className="hover:text-gray-800">
                            Terms & Conditions
                            </Link>
                            
                        </div>
                    </div>                   
                </div> 
            </form>
        </section>
    )
}