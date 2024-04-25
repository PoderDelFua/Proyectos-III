"use client"

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { BACKEND_URI } from "@/config/env"
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

function ActivityChat({ hiloId, userId }) {
  if (!hiloId) {
    return <div>Este actividad no tiene el chat</div>
  }

  const token = localStorage.getItem('token')
  const [chatData, setChatData] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const chatContainerRef = useRef(null)

  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/hilo/getMsgHilo/${hiloId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      console.log("Buscando datos del chat...")
      const data = await response.json()
      console.log(data)
      setChatData(data.reverse())
    } catch (error) {
      console.error("Error al cargar la información del chat: ", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatData])

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        const response = await fetch(`${BACKEND_URI}/mensajes/crearPost`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            autorMensaje: userId,
            mensaje: newMessage,
            hiloId,
          }),
        })
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        setNewMessage('')
        await fetchData()
      } catch (error) {
        console.error("Error al enviar el mensaje: ", error)
      }
    }
  }

  if (!chatData) {
    return <div>Loading chat...</div>
  }

  return (
    <div className="flex flex-col h-60">
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
        {chatData.map((message, index) => {
          const prevMessage = index > 0 ? chatData[index - 1] : null
          const showNickname = !prevMessage || message.autorMensaje._id !== prevMessage.autorMensaje._id
          const isCurrentUser = message.autorMensaje._id === userId

          return (
            <div key={message._id} className={`flex items-start mb-4 ${isCurrentUser ? 'justify-end' : ''}`}>
              {showNickname && !isCurrentUser && (
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              )}
              {!showNickname && !isCurrentUser && (
                <div className="w-8 h-8 bg-transparent rounded-full mr-2"></div>
              )}
              {showNickname && isCurrentUser && (
                <div className="w-8 h-8 bg-gray-300 rounded-full ml-2 order-2"></div>
              )}
              {!showNickname && isCurrentUser && (
                <div className="w-8 h-8 bg-transparent rounded-full ml-2 order-2"></div>
              )}
              <div className={`rounded-lg p-2 max-w-xs ${showNickname && isCurrentUser && 'rounded-tr-none'} ${showNickname && !isCurrentUser && 'rounded-tl-none'} ${isCurrentUser ? 'bg-gray-300 order-1' : 'bg-gray-200'}`}>
                {showNickname && (
                  <div className="font-semibold">{isCurrentUser ? 'Tú' : `@${message.autorMensaje.nickname}` || 'Unknown User'}</div>
                )}
                <div>{message.mensaje}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="bg-white p-4 flex items-center">
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="ml-5 focus:outline-none"
          onClick={handleSendMessage}
        >
          <PaperAirplaneIcon className="h-10 w-10 fill-gray-600 hover:fill-gray-800 cursor-pointer transition-colors duration-200" />
        </button>
      </div>
    </div>
  )
}

export default ActivityChat