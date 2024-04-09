import { useState } from 'react';
import { DiscussionIcon} from '@heroicons/react/24/solid';

function SidebarForo({ defaultSelected }) {
  const [activeOption, setActiveOption] = useState(defaultSelected);

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  // Definición de las opciones de foros directamente en el componente
  const forumOptions = [
    {
      key: 'forum1',
      label: 'Foro 1',
      icon: <DiscussionIcon className="mr-5 h-7 w-7" />,
    },
    {
      key: 'forum2',
      label: 'Foro 2',
      icon: <DiscussionIcon className="mr-5 h-7 w-7" />,
    },
    {
      key: 'forum3',
      label: 'Foro 3',
      icon: <DiscussionIcon className="mr-5 h-7 w-7" />,
    },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-primary-gray rounded-r-3xl z-50">
      <div className="flex flex-col h-full">
        {/* Logo container */}
        <div className="flex justify-center items-center pt-10 pb-2">
          <img src="/logoU.png" alt="Logo" className="h-20 w-20 rounded-full" /> {/* Replace with your image path */}
        </div>
        <nav className="flex-1 pl-4 py-10 space-y-4">
          {forumOptions.map((option) => (
            <div key={option.key} className={`${activeOption !== option.key ? 'pr-10' : ''}`}>
              {activeOption === option.key && (
                <div className="relative">
                  <div className="absolute bottom-0 right-0 h-5 w-5 bg-white"></div>
                  <div className="absolute bottom-0 right-0 h-5 w-5 bg-primary-gray rounded-br-full"></div>
                </div>
              )}
              <a
                href={`/${option.key}`}
                onClick={() => handleOptionClick(option.key)}
                className={`group flex items-center py-2 px-4 text-black ${
                  activeOption === option.key ? 'bg-white rounded-l-full' : 'hover:bg-light-gray rounded-full'
                }`}
              >
                {option.icon}
                <span className="text-xl font-semibold">{option.label}</span>
              </a>
              {activeOption === option.key && (
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
