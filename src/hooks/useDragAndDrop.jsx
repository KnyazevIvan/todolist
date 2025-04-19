import { useState } from 'react';

// Кастомный хук для логики drag & drop
function useDragAndDrop({ tasks, setTasks, columns, setColumns }) {
  // Состояния для drag & drop задач
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  
  // Состояния для drag & drop колонок
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [dragOverColumnIndex, setDragOverColumnIndex] = useState(null);

  // Перемещение задачи между колонками
  const moveTask = (taskId, targetColumn) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? {...task, column: targetColumn} : task
    ));
  };

  // Обработчики событий для drag & drop задач
  const handleTaskDragStart = (e, task) => {
    setDraggedTask(task);
    // Устанавливаем прозрачность для перетаскиваемого элемента
    e.currentTarget.classList.add('opacity-50');
    // Для Firefox
    e.dataTransfer.setData('text/plain', task.id);
  };
  
  const handleTaskDragEnd = (e) => {
    setDraggedTask(null);
    e.currentTarget.classList.remove('opacity-50');
    setDragOverColumn(null);
  };
  
  const handleColumnDragOver = (e, column) => {
    e.preventDefault();
    if (dragOverColumn !== column) {
      setDragOverColumn(column);
    }
  };
  
  const handleColumnDrop = (e, column) => {
    e.preventDefault();
    if (draggedTask && draggedTask.column !== column) {
      moveTask(draggedTask.id, column);
    }
    setDragOverColumn(null);
  };
  
  // Обработчики событий для drag & drop колонок
  const handleColumnDragStart = (e, columnIndex) => {
    setDraggedColumn(columnIndex);
    // Устанавливаем прозрачность
    e.currentTarget.classList.add('opacity-50');
    e.dataTransfer.setData('text/plain', columnIndex);
  };
  
  const handleColumnDragEnd = (e) => {
    setDraggedColumn(null);
    e.currentTarget.classList.remove('opacity-50');
    setDragOverColumnIndex(null);
  };
  
  const handleColumnIndexDragOver = (e, columnIndex) => {
    e.preventDefault();
    if (dragOverColumnIndex !== columnIndex) {
      setDragOverColumnIndex(columnIndex);
    }
  };
  
  const handleColumnIndexDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedColumn !== null && draggedColumn !== targetIndex) {
      const newColumns = [...columns];
      const [movedColumn] = newColumns.splice(draggedColumn, 1);
      newColumns.splice(targetIndex, 0, movedColumn);
      setColumns(newColumns);
    }
    setDragOverColumnIndex(null);
  };

  return {
    draggedTask,
    dragOverColumn,
    draggedColumn,
    dragOverColumnIndex,
    moveTask,
    handleTaskDragStart,
    handleTaskDragEnd,
    handleColumnDragOver,
    handleColumnDrop,
    handleColumnDragStart,
    handleColumnDragEnd,
    handleColumnIndexDragOver,
    handleColumnIndexDrop
  };
}

export default useDragAndDrop;