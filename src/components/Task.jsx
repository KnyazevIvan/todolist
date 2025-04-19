import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

function Task({ task, onDragStart, onDragEnd, onEdit, onDelete, priorityColorClass }) {
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

  return (
    <div
      className={`p-3 bg-white dark:bg-gray-700 rounded shadow-sm ${priorityColorClass} cursor-move`}
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
    >
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
    </div>
  );
}

export default Task;