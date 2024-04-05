"use client"
import Link from 'next/link'

function cleanToken() {
    localStorage.removeItem('token')
}



export default function WelcomePage() {
//Rehacer pagina, no podemos estar con link, usar navbar
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-xl">
                {/* Logo */}
                <div className="mb-8">
                    <img src="/LOGO_UTAD.png" alt="Logo" className="mx-auto h-24" />
                </div>

                <h1 className="text-5xl font-bold mb-4">Bienvenido</h1>
                <p className="text-gray-600 mb-10 text-lg">Descripción</p>

                <Link href="/login" className="bg-black text-white px-10 py-4 rounded-full font-semibold hover:bg-gray-800 transition duration-200 text-lg">
                    Únete
                </Link>

                <p className="mt-10">
                    <Link href="/home" className="text-gray-500 text-base" onClick={cleanToken}>
                        Continuar sin unirse
                    </Link>
                </p>

                <hr className="border-gray-200 my-10" />

                <div className="flex justify-center space-x-8 text-gray-500 text-base">
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
