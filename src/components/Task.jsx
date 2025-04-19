import React from 'react';
import { Edit, Trash2, Save, X } from 'lucide-react';

function Task({ task, onDragStart, onDragEnd, onEdit, onDelete, priorityColorClass, isEditing, editedText, setEditedText, saveEdit, cancelEdit }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div
      className={`p-3 bg-white dark:bg-gray-700 rounded shadow-sm ${priorityColorClass} cursor-move`}
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
    >
      {isEditing ? (
        <div className="flex items-center gap-2"> {/* Changed flex-col to flex items-center */}
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-2 border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500" // Merged classNames, removed w-full
            autoFocus
          />
          <div className="flex gap-2 shrink-0"> {/* Added shrink-0 */}
            <button
              onClick={saveEdit}
              className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-600 p-1"
              aria-label="Сохранить"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={cancelEdit}
              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-600 p-1"
              aria-label="Отмена"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-800 dark:text-white break-words overflow-hidden">
              {task.text}
            </div>
            <div className="flex gap-1 ml-2 shrink-0">
              <button
                onClick={onEdit}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 p-1"
                aria-label="Редактировать задачу"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1"
                aria-label="Удалить задачу"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between text-xs mt-2">
            <span className="text-gray-500 dark:text-gray-400">
              {formatDate(task.createdAt)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default Task;
