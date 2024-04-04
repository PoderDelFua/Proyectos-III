import { useState } from 'react';

export default function CrearThreadForm({ tag, nombreUsuario }) {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { nombreUsuario, titulo, texto, tag };
      await fetch('/api/hilos/crear', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });
      
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título del Hilo"
        required
      />
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Texto del Hilo"
        required
      />
      <button type="submit">Crear Hilo</button>
    </form>
  );
}
