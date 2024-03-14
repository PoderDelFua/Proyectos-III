"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BACKEND_URI } from '@/config/env'

export default function LoginUser() {

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
            <div className="h-full flex justify-start min-h-screen bg-cover bg-[url('/fondo-login.png')]">
                <div className=" py-8 px-14 flex h-auto mt-6 mb-20 rounded ml-16 custom-container-login">
                    <form onSubmit={handleSubmit}>
                        <div className="lg:flex">
                            <img src="/LOGO_UTAD.png" alt="u-tad image" style={{ width:'400px', height:'auto' }} className="mb-4" />
                        </div>   
                        <div className="mb-6">
                            <label htmlFor="correo" className="block custom-letras-correo">Introduce tu correo U-tad</label>
                            <input onChange={(e) => setcorreo(e.target.value)} type="correo" name="correo" id="correo" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600 custom-rectangulo" />
                        </div>
                        <div className="">
                            <label htmlFor="password" className="block custom-letras-correo">Contraseña</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password"  className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600 custom-rectangulo" /> 
                            {error && <p className="text-red-500  mt-8 mb-8 text-center">{error}</p>}
                        </div>
                        <div className="flex justify-between mt-8 mb-8">
                            <button type="button" onClick={handleCancelClick} className="cursor-pointer py-2 px-4 text-white font-bold w-1/2 rounded mr-8 custom-cancel-button">Cancelar</button>
                            <button type="submit" className="cursor-pointer py-2 px-4 text-white font-bold w-1/2 rounded custom-enter-button">Entrar</button>
                        </div>
                            
                        <Link href="/signup" className="text-sm font-thin hover:underline mt-8 inline-block custom-letras-registrate">¿No estás registrado? <span className="custom-letras-registrate-color">Regístrate ahora</span></Link>
                        
                    </form>
                </div>
            </div>
        </section>
    )
}