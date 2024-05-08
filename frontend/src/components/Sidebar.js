"use client"

import { useState, useEffect } from 'react';
import { HomeIcon, UserIcon, Cog6ToothIcon, CalendarDaysIcon, Bars3Icon } from '@heroicons/react/24/solid';

function Sidebar({ selectedTab = 'home' }) {
  const [activeItem, setActiveItem] = useState(selectedTab);
  const [SidebarOpen, setSidebarOpen] = useState(false);


  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!SidebarOpen);
  };

  useEffect(() => {

    //Animación automática por tamaño de pantalla
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
    <div className={`fixed inset-y-0 bg-primary-gray rounded-r-3xl z-50 md:block transition-all duration-500 ${SidebarOpen ? 'left-0 w-64' : '-left-64 w-0'}`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-center items-center pt-10 pb-2">
          <img src="/logoU.png" alt="Logo" className="h-20 w-20 rounded-full" />
        </div>
        <nav className="flex-1 pl-4 py-10 space-y-4">
          <div className={`${activeItem !== 'home' ? 'pr-10' : '' }`}>
            {activeItem === 'home' && (
              <div className="relative">
                <div className="absolute bottom-0 right-0 h-5 w-5 bg-white"></div>
                <div className="absolute bottom-0 right-0 h-5 w-5 bg-primary-gray rounded-br-full"></div>
              </div>
            )}
            <a
              href="/home"
              onClick={() => handleItemClick('home')}
              className={`group flex items-center py-2 px-4 text-black ${
                activeItem === 'home' ? 'bg-white rounded-l-full' : 'hover:bg-light-gray rounded-full'
              }`}
            >
              <HomeIcon className="mr-5 h-7 w-7" />
              <span className="text-xl font-semibold">Home</span>
            </a>
            {activeItem === 'home' && (
              <div className="relative">
                <div className="absolute top-0 right-0 h-5 w-5 bg-white"></div>
                <div className="absolute top-0 right-0 h-5 w-5 bg-primary-gray rounded-tr-full"></div>
              </div>
            )}
          </div>
          <div className={`${activeItem !== 'profile' ? 'pr-10' : '' }`}>
            {activeItem === 'profile' && (
              <div className="relative">
                <div className="absolute bottom-0 right-0 h-5 w-5 bg-white"></div>
                <div className="absolute bottom-0 right-0 h-5 w-5 bg-primary-gray rounded-br-full"></div>
              </div>
            )}
            <a
              href="/registered/profile"
              onClick={() => handleItemClick('profile')}
              className={`group flex items-center py-2 px-4 text-black ${
                activeItem === 'profile' ? 'bg-white rounded-l-full' : 'hover:bg-light-gray rounded-full'
              }`}
            >
              <UserIcon className="mr-5 h-7 w-7" />
              <span className="text-xl font-semibold">Perfil</span>
            </a>
            {activeItem === 'profile' && (
              <div className="relative">
                <div className="absolute top-0 right-0 h-5 w-5 bg-white"></div>
                <div className="absolute top-0 right-0 h-5 w-5 bg-primary-gray rounded-tr-full"></div>
              </div>
            )}
          </div>
          <div className={`${activeItem !== 'settings' ? 'pr-10' : '' }`}>
            {activeItem === 'settings' && (
              <div className="relative">
                <div className="absolute bottom-0 right-0 h-5 w-5 bg-white"></div>
                <div className="absolute bottom-0 right-0 h-5 w-5 bg-primary-gray rounded-br-full"></div>
              </div>
            )}
            <a
              href="#"
              onClick={() => handleItemClick('settings')}
              className={`group flex items-center py-2 px-4 text-black ${
                activeItem === 'settings' ? 'bg-white rounded-l-full' : 'hover:bg-light-gray rounded-full'
              }`}
            >
              <Cog6ToothIcon className="mr-5 h-7 w-7" />
              <span className="text-xl font-semibold">Ajustes</span>
            </a>
            {activeItem === 'settings' && (
              <div className="relative">
                <div className="absolute top-0 right-0 h-5 w-5 bg-white"></div>
                <div className="absolute top-0 right-0 h-5 w-5 bg-primary-gray rounded-tr-full"></div>
              </div>
            )}
          </div>
          <div className={`${activeItem !== 'calendar' ? 'pr-10' : '' }`}>
            {activeItem === 'calendar' && (
              <div className="relative">
                <div className="absolute bottom-0 right-0 h-5 w-5 bg-white"></div>
                <div className="absolute bottom-0 right-0 h-5 w-5 bg-primary-gray rounded-br-full"></div>
              </div>
            )}
            <a
              href="/registered/calendario"
              onClick={() => handleItemClick('calendar')}
              className={`group flex items-center py-2 px-4 text-black ${
                activeItem === 'calendar' ? 'bg-white rounded-l-full' : 'hover:bg-light-gray rounded-full'
              }`}
            >
              <CalendarDaysIcon className="mr-5 h-7 w-7" />
              <span className="text-xl font-semibold">Calendario</span>
            </a>
            {activeItem === 'calendar' && (
              <div className="relative">
                <div className="absolute top-0 right-0 h-5 w-5 bg-white"></div>
                <div className="absolute top-0 right-0 h-5 w-5 bg-primary-gray rounded-tr-full"></div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
        
    <button
        onClick={toggleSidebar}
        className={`fixed md:hidden top-5 left-5 z-50 bg-primary-gray rounded-full p-3 text-black hover:bg-light-gray`}
    >
        <Bars3Icon className="h-6 w-6" />
    </button>
    </>

  );
}

export default Sidebar;