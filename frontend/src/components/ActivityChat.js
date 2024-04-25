"use client"

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { BACKEND_URI } from "@/config/env"

function ActivityChat({ hiloId }) {
  if (!hiloId) {
    return <div>Esta actividad no tiene chat</div>
  }

  const token = localStorage.getItem('token')
  const [chatData, setChatData] = useState([])
  const chatContainerRef = useRef(null)

  useEffect(() => {
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
        setChatData(data.reverse()) // Reverse the chatData list
      } catch (error) {
        console.error("Error al cargar la información del chat: ", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatData])

  if (!chatData) {
    return <div>Loading chat...</div>
  }

  return (
    <div className="flex flex-col h-60">
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
        {chatData.map((message, index) => {
          const prevMessage = index > 0 ? chatData[index - 1] : null
          const showNickname = !prevMessage || message.autorMensaje.nickname !== prevMessage.autorMensaje.nickname

          return (
            <div key={message._id} className="flex items-start mb-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              <div className={`bg-gray-200 rounded-lg rounded-tl-none p-2 max-w-xs ${message.autorMensaje === 'currentUserId' ? 'ml-auto bg-blue-200' : ''}`}>
                {showNickname && (
                  <div className="font-semibold">{`@${message.autorMensaje.nickname}` || 'Unknown User'}</div>
                )}
                <div>{message.mensaje}</div>
              </div>
            </div>
          )
        })}
      </div>
      {/* Placeholder for message input */}
      <div className="bg-white p-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="Escribe un mensaje..."
          disabled
        />
      </div>
    </div>
  )
}

export default ActivityChat