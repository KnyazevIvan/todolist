import React from 'react';
import { PlusCircle } from 'lucide-react';

function NewTaskForm({
  newTaskText,
  setNewTaskText,
  newTaskColumn,
  setNewTaskColumn,
  newTaskPriority,
  setNewTaskPriority,
  addTask,
  columns
}) {
  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Новая задача</h2>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Что нужно сделать?"
          className="flex-grow p-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        
        <select
          value={newTaskColumn}
          onChange={(e) => setNewTaskColumn(e.target.value)}
          className="md:w-1/6 p-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {columns.map(column => (
            <option key={column} value={column}>{column}</option>
          ))}
        </select>
        
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
          className="md:w-1/6 p-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <option value="Высокий">Высокий</option>
          <option value="Средний">Средний</option>
          <option value="Низкий">Низкий</option>
        </select>
        
        <button 
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded flex items-center justify-center"
        >
          <PlusCircle className="w-5 h-5 mr-1" />
          <span>Добавить</span>
        </button>
      </div>
    </div>
  );
}

export default NewTaskForm;