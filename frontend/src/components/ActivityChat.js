"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { BACKEND_URI } from "@/config/env";

function ActivityChat({ hiloId }) {
  if (!hiloId) {
    return <div>Este actividad no tiene el chat</div>
  }

  const token = localStorage.getItem('token')
  const [chatData, setChatData] = useState([])

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
          setChatData(data)
      } catch (error) {
        console.error("Error al cargar la información del chat: ", error)
      }
    }
    fetchData()
  }, [])

  if (!chatData) {
    return <div>Loading chat...</div>
  }

  return (
    <div>Chat</div>
  )
}

export default ActivityChat