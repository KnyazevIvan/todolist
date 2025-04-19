import React from 'react';
import { Settings, Moon, Sun } from 'lucide-react';

function KanbanHeader({ toggleDarkMode, darkMode, openSettings }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Kanban-доска</h1>
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          aria-label={darkMode ? "Переключить на светлую тему" : "Переключить на темную тему"}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button 
          onClick={openSettings}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          aria-label="Открыть настройки"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default KanbanHeader;