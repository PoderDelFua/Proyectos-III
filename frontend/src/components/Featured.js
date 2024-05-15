"use client"

import { BACKEND_URI } from "@/config/env";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Featured() {
  const [hilos, setHilos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
          try {
              const response = await fetch(`${BACKEND_URI}/hilo/hilosPublicos`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
              if (!response.ok) {
                  throw new Error('No se pudo cargar la información de los hilos');
              }
              const data = await response.json();
              setHilos(data.map(hilo => ({
                  _id: hilo._id,
                  titulo: hilo.titulo,
                  creador: `@${hilo.creadorId.nickname}`,
                  postCount: hilo.postCount
              })));
          } catch (error) {
              console.error("Error al cargar la información de los hilos: ", error);
          }
      }

      fetchData();
  });

  return (
    <div className="fixed inset-y-0 right-0 w-64 shadow-2xl rounded-l-3xl p-4 custom-bg-color2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl ml-2 font-bold">Foro</h2>
      </div>
      <nav className="flex-1 py-6">
        {hilos.map((hilo) => (    
          <a key={hilo._id} href={`/foro/${hilo._id}`} className="block hover:bg-white rounded-md rounded-[1.5rem] p-2">
            <div className="flex flex-col pl-5 py-4 justify-between w-full">
              <p className="text-sm text-custom-active">Creador: {hilo.creador}</p>
              <p className="font-medium overflow-hidden whitespace-nowrap text-ellipsis" style={{ maxWidth: "calc(100% - 0.8rem)" }}>
                {hilo.titulo.length > 26 ? `${hilo.titulo.substring(0, 26)}...` : hilo.titulo}
              </p>
              <p className="text-sm text-custom-active">{hilo.postCount} posts</p>
            </div>
          </a> 
        ))}
      </nav>
      <div className="text-center mt-2">
        <a href="/foro" className="text-sm text-blue-600 hover:underline">Mostrar más</a>
      </div>
    </div>
  );
}

export default Featured;