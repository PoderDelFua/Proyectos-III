"use client"
import Link from 'next/link'



function cleanToken() {
    localStorage.removeItem('token')
}



export default function WelcomePage() {
    
return (
    <div className="flex flex-col justify-between h-screen">
        
      <div className="rounded-lg text-center">
      <img src="/fondo-login.png" alt="Background" className="w-full h-48 object-cover" />
        <div className="m-8">
          <img src="/LOGO_UTAD.png" alt="Logo" className="mx-auto h-24" />
        </div>

        <h1 className="text-5xl font-bold mb-4">Bienvenido</h1>
        <p className="text-gray-600 mb-10 text-lg">Entra para conectarte con otras personas amantes de la música</p>

        <Link href="/login" className="bg-blue text-white px-12 py-4 rounded-lg font-semibold hover:bg-dark-blue transition duration-200 text-lg">
          Únete
        </Link>

        <p className="mt-10">
          <Link href="/home" className="text-blue text-base hover:text-dark-blue transition duration-200" onClick={cleanToken}>
            Continuar sin unirse
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
  );
}
