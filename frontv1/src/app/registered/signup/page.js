"use client"

import Navbar from '@/components/Navbar';
import MultiSelect from '@/components/MultiSelect';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function RegisterUser() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [interests, setInterests] = useState([]);
    const [receiveOffers, setReceiveOffers] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userId = uuidv4()

        const user = {
            id: userId,
            name: name,
            age: age,
            city: "Madrid",
            interests: interests,
            receiveOffers: receiveOffers,
            email: email,
            password: password,
        };

        const userExistsResponse = await fetch('/api/checkExists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await userExistsResponse.json()
        console.log(data.status)

        if (data.status == 500) {
            alert(data.message)
            return
        } else if (data.exists) {
            alert("The user already exists")
            return
        }

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        router.push('/')
    }

    const interestsOptions = ['violin', 'guitarra', 'percusion', 'teclado']

    return (
        <section>
            <div>
                <Navbar />
            </div>
            <div className="h-screen bg-gray-100 flex justify-center">
                <div className="py-6 px-8 mt-20 bg-white rounded shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-800 font-bold">Nombre completo:</label>
                            <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder="John Doe" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="age" className="block text-gray-800 font-bold">Edad:</label>
                            <input onChange={(e) => setAge(e.target.value)} type="text" name="age" id="age" placeholder="25" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />
                        </div>
                        <div className="mb-6">
                            <MultiSelect
                                formFieldName={"interests"}
                                options={interestsOptions}
                                onChange={(e) => setInterests(e)}
                                prompt="Seleccione uno o mas instrumentos" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="offers" className="block text-gray-800 font-bold">¿Quieres recibir nuestras ofertas especiales?</label>
                            <input onChange={(e) => setReceiveOffers(e.target.checked)} type="checkbox" name="offers" id="offers" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-800 font-bold">Email:</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="@email" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-800 font-bold">Contraseña:</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="contraseña" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />
      
                            <Link href="/registered/login" className="text-sm font-thin text-gray-800 hover:underline mt-2 mr-3 inline-block hover:text-indigo-600">¿Ya tienes una cuenta?</Link>
                        </div>
                        <button type="submit" className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Login</button>
                    </form>
                </div>
            </div>
        </section>
    );
}