"use client"

import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UsersIcon, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid'
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import ActivityChat from './ActivityChat'

function ActivityInfo({ isOpen, onClose, userId, activity, foto, 
                        nickname, handleUnirse, unido, handleFavorite, favorite, users }) {
  const [activeTab, setActiveTab] = useState('participants')

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203</span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <img src={foto} alt="Imagen de la actividad" className="h-56 w-full object-cover mb-4 rounded-lg" />
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{activity.nombre}</h2>
                </div>
                <div className="flex items-center">
                  <button
                      onClick={(e) => {
                          e.stopPropagation()
                          handleFavorite()
                      }}
                      className="cursor-pointer bg-light-blue rounded-lg p-2 mr-4"
                  >
                      {favorite ? (
                          <BookmarkIconSolid className="h-7 w-7 text-blue" />
                      ) : (
                          <BookmarkIconOutline className="h-7 w-7 text-blue" />
                      )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (unido) return
                      handleUnirse()
                    }}
                    type="button"
                    className={`cursor-pointer transition-all ${!unido && 'bg-blue border-dark-blue'} ${unido && 'bg-dark-blue border-black'} text-white px-6 py-2 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
                  >
                    {unido ? 'Unido✔' : 'Unirse'}
                  </button>
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-1 flex-col">
                  <div>
                    <p className="text-gray-600">Creado por @{nickname}</p>
                    <h3 className="text-lg font-bold">{activity.horarios}</h3>
                  </div>
                  <p className="text-gray-700 my-4">{activity.descripcion}</p>
                  {activity.instrumento && (
                    <div className="mb-4">
                      <h4 className="text-lg font-bold mb-2">Instrumentos</h4>
                      <ul className="list-disc list-inside">
                        {activity.instrumento.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-1">
                  <div className="w-full bg-light-blue rounded-lg shadow p-4 ml-4 mt-2 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex space-x-4">
                        <button
                          className={`text-lg font-bold cursor-pointer ${
                            activeTab === 'participants' ? 'text-black' : 'text-gray-600'
                          }`}
                          onClick={() => handleTabClick('participants')}
                        >
                          Participantes
                          {activeTab === 'participants' && (
                            <div className="h-0.5 w-full bg-black rounded-sm transition-all duration-300" />
                          )}
                        </button>
                        <button
                          className={`text-lg font-bold cursor-pointer ${
                            activeTab === 'chat' ? 'text-black' : 'text-gray-600'
                          }`}
                          onClick={() => handleTabClick('chat')}
                        >
                          Chat
                          {activeTab === 'chat' && (
                            <div className="h-0.5 w-full bg-black rounded-sm transition-all duration-300" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center">
                        <span>{users.length}</span>
                        <UsersIcon className="h-6 w-6 mr-1 fill-blue" />
                      </div>
                    </div>
                    {activeTab === 'participants' && (
                      <ul className="max-h-40 overflow-y-auto">
                        {users.map((user) => (
                          <li key={user._id} className="py-1">
                            @{user.nickname}
                          </li>
                        ))}
                      </ul>
                    )}
                    {activeTab === 'chat' && (
                      <ActivityChat hiloId={activity.hiloActividad} userId={userId} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ActivityInfo