import React from 'react';
import Task from './Task';

function Column({
  column,
  tasks,
  onDragOver,
  onDrop,
  onDragStart,
  onDragEnd,
  onEditTask,
  onDeleteTask,
  priorityColorClass,
  isDragOver
}) {
  return (
    <div
      className={`min-w-[280px] max-w-[280px] bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex-shrink-0 flex flex-col 
        ${isDragOver ? 'border-2 border-blue-400 dark:border-blue-500' : 'border border-gray-200 dark:border-gray-700'}`}
      onDragOver={(e) => onDragOver(e, column)}
      onDrop={(e) => onDrop(e, column)}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-700 dark:text-gray-300">{column}</h3>
        <span className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
          {tasks.length}
        </span>
      </div>
      
      <div className="flex-grow overflow-y-auto space-y-2">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
            priorityColorClass={priorityColorClass(task.priority)}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;