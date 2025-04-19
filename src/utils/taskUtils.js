// Утилиты для работы с задачами

// Функция для получения цвета приоритета
export const getPriorityColorClass = (priority) => {
    const baseClasses = {
      'Высокий': 'border-l-4 border-red-500',
      'Средний': 'border-l-4 border-yellow-500',
      'Низкий': 'border-l-4 border-green-500'
    };
    
    const textClasses = {
      'Высокий': 'text-red-500 dark:text-red-400',
      'Средний': 'text-yellow-600 dark:text-yellow-400',
      'Низкий': 'text-green-600 dark:text-green-400'
    };
    
    return `${baseClasses[priority]} ${textClasses[priority]}`;
  };
  
  // Функция для фильтрации задач
  export const filterTasks = (tasks, filterPriority) => {
    let filteredTasks = [...tasks];
    
    // Фильтрация по приоритету
    if (filterPriority !== 'Все') {
      filteredTasks = filteredTasks.filter(task => task.priority === filterPriority);
    }
    
    return filteredTasks;
  };
  
  // Функция для получения задач по колонкам
  export const getTasksByColumn = (tasks, columns, filterPriority) => {
    const filteredTasks = filterTasks(tasks, filterPriority);
    const tasksByColumn = {};
    
    columns.forEach(column => {
      tasksByColumn[column] = filteredTasks.filter(task => task.column === column);
    });
    
    return tasksByColumn;
  };
  
  // Создание новой задачи
  export const createTask = (text, column, priority) => {
    return {
      id: Date.now(),
      text,
      column,
      priority,
      createdAt: new Date().toISOString()
    };
  };