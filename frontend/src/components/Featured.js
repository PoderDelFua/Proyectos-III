"use client"

import { useState } from 'react';
import { CogIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

function Featured() {
  // Sample data for forums
  const forums = [
    { name: 'Foro1', creator: '@nickname1', postCount: 50 },
    { name: 'Foro2', creator: '@nickname2', postCount: 26 },
    { name: 'Foro3', creator: '@nickname3', postCount: 38 },
    // ... add more forums as needed
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg rounded-l-3xl p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Destacados</h2>
        <CogIcon className="h-5 w-5" />
      </div>
      <div className="mt-4">
        {forums.map((forum, index) => (
          <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md">
            <div>
              <p className="font-medium">{forum.name}</p>
              <p className="text-sm text-gray-600">Creador: {forum.creator}</p>
              <p className="text-sm text-gray-600">{forum.postCount} posts</p>
            </div>
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <a href="#" className="text-sm text-blue-600 hover:underline">Mostrar más</a>
      </div>
    </div>
  );
}

export default Featured;