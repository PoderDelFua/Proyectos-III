import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HiloDetalles() {
  const router = useRouter();
  const { id } = router.query; 

  const [hilo, setHilo] = useState({});
  const [textoRespuesta, setTextoRespuesta] = useState('');

  useEffect(() => {
    const cargarHilo = async () => {
      if (!id) return;
      const respuesta = await fetch(`/api/hilos/${id}`);
      const data = await respuesta.json();
      setHilo(data);
    };

    cargarHilo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/hilos/responder/${id}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ nombreUsuario: 'NombreUsuario', texto: textoRespuesta }),
    });

    setTextoRespuesta('');
    router.reload();
  };

  return (
    <div>
      <h1>{hilo.titulo}</h1>
      <p>{hilo.texto}</p>
      {/*Respuestas*/}
      <div>
        {hilo.respuestas?.map((respuesta, index) => (
          <div key={index}>
            <p>{respuesta.nombreUsuario}: {respuesta.texto}</p>
          </div>
        ))}
      </div>
      {/*Formulario Respuestas*/}
      <form onSubmit={handleSubmit}>
        <textarea
          value={textoRespuesta}
          onChange={(e) => setTextoRespuesta(e.target.value)}
          placeholder="Escribe tu respuesta aquí"
          required
        ></textarea>
        <button type="submit">Responder</button>
      </form>
    </div>
  );
}
