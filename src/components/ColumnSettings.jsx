import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Edit, Trash2, Plus, Check, X } from 'lucide-react';

function ColumnSettings({ columns, setColumns, moveColumnLeft, moveColumnRight, deleteColumn }) {
  const [newColumnName, setNewColumnName] = useState('');
  const [editingColumnName, setEditingColumnName] = useState(null);
  const [editedColumnName, setEditedColumnName] = useState('');

  // Добавление новой колонки
  const addColumn = () => {
    if (newColumnName.trim() === '' || columns.includes(newColumnName.trim())) {
      return;
    }
    setColumns([...columns, newColumnName.trim()]);
    setNewColumnName('');
  };

  // Обработчик для инпута новой колонки
  const handleColumnInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      addColumn();
    }
  };

  // Предотвращение потери фокуса при клике внутри инпута
  const handleColumnInputClick = (e) => {
    e.stopPropagation();
  };

  // Редактирование названия колонки
  const startEditingColumnName = (column) => {
    setEditingColumnName(column);
    setEditedColumnName(column);
  };

  const saveEditedColumnName = (oldColumnName) => {
    if (editedColumnName.trim() === '' || (editedColumnName.trim() !== oldColumnName && columns.includes(editedColumnName.trim()))) {
      setEditingColumnName(null);
      return;
    }

    // Обновляем колонки
    const newColumns = columns.map(col => col === oldColumnName ? editedColumnName.trim() : col);
    setColumns(newColumns);
    setEditingColumnName(null);
  };

  // Обработчик клавиш при редактировании названия колонки
  const handleColumnNameInputKeyDown = (e, oldColumnName) => {
    if (e.key === 'Enter') {
      saveEditedColumnName(oldColumnName);
    } else if (e.key === 'Escape') {
      setEditingColumnName(null);
    }
  };

  // Предотвращение потери фокуса при клике внутри инпута
  const handleColumnNameInputClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Колонки</h3>
      <ul className="space-y-2 mb-4">
        {columns.map((column, index) => (
          <li 
            key={column} 
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
          >
            {editingColumnName === column ? (
              <input
                type="text"
                value={editedColumnName}
                onChange={(e) => setEditedColumnName(e.target.value)}
                className="flex-grow mr-2 p-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                onKeyDown={(e) => handleColumnNameInputKeyDown(e, column)}
                onClick={handleColumnNameInputClick}
                autoFocus
              />
            ) : (
              <span className="flex-grow text-gray-800 dark:text-white">{column}</span>
            )}
            
            <div className="flex items-center space-x-1">
              {editingColumnName === column ? (
                <>
                  <button
                    onClick={() => saveEditedColumnName(column)}
                    className="text-green-500 hover:text-green-600 p-1"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setEditingColumnName(null)}
                    className="text-red-500 hover:text-red-600 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => moveColumnLeft(index)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1"
                    disabled={index === 0}
                  >
                    <ArrowLeft className={`w-5 h-5 ${index === 0 ? 'opacity-50' : ''}`} />
                  </button>
                  <button
                    onClick={() => moveColumnRight(index)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1"
                    disabled={index === columns.length - 1}
                  >
                    <ArrowRight className={`w-5 h-5 ${index === columns.length - 1 ? 'opacity-50' : ''}`} />
                  </button>
                  <button
                    onClick={() => startEditingColumnName(column)}
                    className="text-blue-500 hover:text-blue-600 p-1"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteColumn(column)}
                    className="text-red-500 hover:text-red-600 p-1"
                    disabled={columns.length <= 1}
                  >
                    <Trash2 className={`w-5 h-5 ${columns.length <= 1 ? 'opacity-50' : ''}`} />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      
      {/* Форма добавления новой колонки */}
      <div className="flex mt-4">
        <input
          type="text"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          placeholder="Название новой колонки"
          className="flex-grow p-2 border dark:border-gray-600 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          onKeyDown={handleColumnInputKeyDown}
          onClick={handleColumnInputClick}
        />
        <button
          onClick={addColumn}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r flex items-center"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ColumnSettings;