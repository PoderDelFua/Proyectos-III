// ChatForo.js pendiende de agregar estilos 

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { LiMensaje, UlMensajes } from './ui-components';

const ChatForo = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const socket = io(''); //puerto de comunicación

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));

    socket.on('chat_message', (data) => {
      setMensajes(mensajes => [...mensajes, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const enviarMensaje = () => {
    socket.emit('chat_message', {
      usuario: socket.id,
      mensaje: nuevoMensaje
    });
    setNuevoMensaje('');
  };

  return (
    <div>
      <h2>{isConnected ? 'CONECTADO' : 'NO CONECTADO'}</h2>
      <UlMensajes>
        {mensajes.map((mensaje, index) => (
          <LiMensaje key={index}>{mensaje.usuario}: {mensaje.mensaje}</LiMensaje>
        ))}
      </UlMensajes>
      <input
        type="text"
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
};

export default ChatForo;
