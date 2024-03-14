import Link from 'next/link';

export default function WelcomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                {/* Logo */}
                <div className="mb-6">
                    <img src="/LOGO_UTAD.png" alt="Logo" className="mx-auto h-12" />
                </div>
                
                <h1 className="text-4xl font-bold mb-2">Bienvenido</h1>
                <p className="text-gray-600 mb-8">Descripción</p>
                
                <Link href="/registered/login" className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-200">
                    Únete
                </Link>
                
                <p className="mt-8">
                    <Link href="/unregistered/home" className="text-gray-500 text-sm">
                        Continuar sin unirse
                    </Link>
                </p>
                
                <hr className="border-gray-200 my-8" />
                
                <div className="flex justify-center space-x-6 text-gray-500 text-sm">
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