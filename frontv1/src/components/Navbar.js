import Link from 'next/link'

export default function Navbar() {
    return (
        <header>
            <nav>
                <div className="flex justify-between h-16 px-10 shadow-lg items-center">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-xl lg:text-2xl font-bold cursor-pointer">UniMusic</h1>
                        <div className="hidden md:flex justify-around space-x-4">
                            <Link href="/" className="hover:text-indigo-600 text-gray-700">Inicio</Link>
                            <Link href="/" className="hover:text-indigo-600 text-gray-700">Descubrir</Link>
                        </div>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <a href="/registered/login" className="text-gray-800 text-sm">LOGIN</a>
                        <a href="/registered/signup" className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">SIGNUP</a>
                    </div>
                </div>
            </nav>
        </header>
    )
}