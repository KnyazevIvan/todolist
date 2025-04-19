import React from 'react';
import { X, Sun, Moon } from 'lucide-react';
import ColumnSettings from './ColumnSettings';

// Модальное окно настроек вынесено в отдельный компонент
function SettingsModal({
  showSettingsModal,
  setShowSettingsModal,
  columns,
  setColumns,
  moveColumnLeft,
  moveColumnRight,
  deleteColumn,
  filterPriority,
  setFilterPriority,
  toggleDarkMode,
  darkMode,
}) {
  if (!showSettingsModal) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 m-4 max-w-xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Настройки</h2>
          <button
            onClick={() => setShowSettingsModal(false)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-6">
          {/* Управление колонками */}
          <ColumnSettings
            columns={columns}
            setColumns={setColumns}
            moveColumnLeft={moveColumnLeft}
            moveColumnRight={moveColumnRight}
            deleteColumn={deleteColumn}
          />
          {/* Фильтры */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Фильтр по приоритету</h3>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="Все">Все приоритеты</option>
              <option value="Высокий">Высокий</option>
              <option value="Средний">Средний</option>
              <option value="Низкий">Низкий</option>
            </select>
          </div>
          {/* Тема */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Оформление</h3>
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white w-full justify-center"
            >
              {darkMode ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span>Светлая тема</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span>Тёмная тема</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowSettingsModal(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;