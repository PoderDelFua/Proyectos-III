"use client"

import { useState } from 'react';

//Falta poner cuando seleccione uno de los foros en el home que aparezca como opción seleccionada
function SidebarForo({ selectedTab = '' }) {
  const [activeItem, setActiveItem] = useState(selectedTab);

  // Sample data for forums
  const forums = [
    { name: 'Foro1', creator: '@nickname1', postCount: 50 },
    { name: 'Foro2', creator: '@nickname2', postCount: 26 },
    { name: 'Foro3', creator: '@nickname3', postCount: 38 },
    // ... add more forums as needed
  ];

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-primary-gray rounded-r-3xl z-50">
      <div className="flex flex-col h-full">
        <nav className="flex-1 pl-4 py-4 space-y-4">
          <h2 className="text-2xl font-bold">Foro</h2>
          <h2 className="text-xl font-bold">Temas</h2>
          {forums.map((forum) => (
            <div key={forum.name} className={`${activeItem !== forum.name.toLowerCase() ? 'pr-10' : '' }`}>
              {activeItem === forum.name.toLowerCase() && (
                <div className="relative">
                  <div className="absolute bottom-0 right-0 h-5 w-5 bg-white"></div>
                  <div className="absolute bottom-0 right-0 h-5 w-5 bg-primary-gray rounded-br-full"></div>
                </div>
              )}
              <a
                href="#"
                onClick={() => handleItemClick(forum.name.toLowerCase())}
                className={`group flex items-center py-2 px-4 text-black ${
                  activeItem === forum.name.toLowerCase() ? 'bg-white rounded-l-full' : 'hover:bg-light-gray rounded-full'
                }`}
              >
                <div className="flex justify-between items-center p-2">
                  <div>
                    <p className="font-medium">{forum.name}</p>
                    <p className="text-sm text-gray-600">Creador: {forum.creator}</p>
                    <p className="text-sm text-gray-600">{forum.postCount} posts</p>
                  </div>
                </div>
              </a>
              {activeItem === forum.name.toLowerCase() && (
                <div className="relative">
                  <div className="absolute top-0 right-0 h-5 w-5 bg-white"></div>
                  <div className="absolute top-0 right-0 h-5 w-5 bg-primary-gray rounded-tr-full"></div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default SidebarForo;
