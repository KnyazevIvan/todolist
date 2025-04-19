import React, { useRef } from 'react';
import Task from './Task';
import useLocalStorage from '../hooks/useLocalStorage';

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
  isDragOver,
  editingTask,
  editedTaskText,
  setEditedTaskText, // Corrected prop name
  saveEditedTask,
  cancelEditing
}) {
  const columnRef = useRef(null);
  const [width, setWidth] = useLocalStorage(`columnWidth_${column}`, 280); // Use the hook

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnRef.current.offsetWidth;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={columnRef}
      style={{ width: `${width}px` }}
      className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex-shrink-0 flex flex-col relative
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
            isEditing={editingTask && editingTask.id === task.id}
            editedText={editedTaskText}
            setEditedText={setEditedTaskText} // Pass the correctly named prop
            saveEdit={saveEditedTask}
            cancelEdit={cancelEditing}
          />
        ))}
      </div>
      <div
        className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize bg-blue-500 opacity-0 hover:opacity-100 transition-opacity"
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
}

export default Column;