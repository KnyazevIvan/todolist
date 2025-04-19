import React, { useEffect, useRef } from 'react';
import KanbanHeader from './components/KanbanHeader';
import NewTaskForm from './components/NewTaskForm';
import Column from './components/Column';
import EmptyState from './components/EmptyState';
import SettingsModal from './components/SettingsModal';
import useLocalStorage from './hooks/useLocalStorage';
import useDragAndDrop from './hooks/useDragAndDrop';
import { getPriorityColorClass, filterTasks, getTasksByColumn, createTask } from './utils/taskUtils';
import { useState } from 'react';

// Главный компонент приложения
export default function KanbanBoard() {
  console.log('KanbanBoard rendered');
  
  // Колонки Kanban - используем кастомный хук
  const defaultColumns = ['Ожидает', 'В процессе', 'Завершено'];
  const [tasks, setTasks] = useLocalStorage('kanbanTasks', []);
  const [columns, setColumns] = useLocalStorage('kanbanColumns', defaultColumns);
  const [darkMode, setDarkMode] = useLocalStorage('kanbanDarkMode', false);
  
  // Состояния для новой задачи
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Средний');
  const [newTaskColumn, setNewTaskColumn] = useState(columns[0]);

  // Состояния для редактирования задачи
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');
  
  // Состояния для фильтрации
  const [filterPriority, setFilterPriority] = useState('Все');
  
  // Состояние для модального окна настроек
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Хук для drag & drop
  const dragAndDrop = useDragAndDrop({ tasks, setTasks, columns, setColumns });
  
  // Ref для контейнера колонок
  const boardRef = useRef(null);
  
  // Применение темы
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#1a1a2e';
      document.body.style.color = '#fff';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }
  }, [darkMode]);

  // Добавление новой задачи
  const addTask = () => {
    if (newTaskText.trim() === '') return;
    
    const newTask = createTask(newTaskText, newTaskColumn, newTaskPriority);
    setTasks([...tasks, newTask]);
    setNewTaskText('');
    // Оставляем другие поля для удобства добавления похожих задач
  };
  
  // Удаление колонки
  const deleteColumn = (columnToDelete) => {
    if (columns.length <= 1) return; // Не даем удалить последнюю колонку
    
    // Перемещаем задачи из удаляемой колонки в первую колонку
    const updatedTasks = tasks.map(task => 
      task.column === columnToDelete ? {...task, column: columns[0]} : task
    );
    
    setTasks(updatedTasks);
    setColumns(columns.filter(column => column !== columnToDelete));
  };
  
  // Перемещение колонки влево
  const moveColumnLeft = (columnIndex) => {
    if (columnIndex <= 0) return;
    
    const newColumns = [...columns];
    const temp = newColumns[columnIndex];
    newColumns[columnIndex] = newColumns[columnIndex - 1];
    newColumns[columnIndex - 1] = temp;
    
    setColumns(newColumns);
  };
  
  // Перемещение колонки вправо
  const moveColumnRight = (columnIndex) => {
    if (columnIndex >= columns.length - 1) return;
    
    const newColumns = [...columns];
    const temp = newColumns[columnIndex];
    newColumns[columnIndex] = newColumns[columnIndex + 1];
    newColumns[columnIndex + 1] = temp;
    
    setColumns(newColumns);
  };
  
  // Удаление задачи
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  // Редактирование задачи - начинаем процесс редактирования
  const startEditingTask = (task) => {
    setEditingTask(task);
    setEditedTaskText(task.text);
  };

  // Сохранение отредактированной задачи
  const saveEditedTask = () => {
    if (!editingTask || editedTaskText.trim() === '') {
      // Если нет задачи для редактирования или текст пустой, сбрасываем состояние
      setEditingTask(null);
      setEditedTaskText('');
      return;
    }

    const updatedTasks = tasks.map(task =>
      task.id === editingTask.id ? { ...task, text: editedTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedTaskText('');
  };

  // Отмена редактирования
  const cancelEditing = () => {
    setEditingTask(null);
    setEditedTaskText('');
  };
  
  // Переключение темной/светлой темы
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Получение задач по колонкам
  const tasksByColumn = getTasksByColumn(tasks, columns, filterPriority);
  const filteredTasksCount = filterTasks(tasks, filterPriority).length;
  
  return (
    <>
      <SettingsModal
        showSettingsModal={showSettingsModal}
        setShowSettingsModal={setShowSettingsModal}
        columns={columns}
        setColumns={setColumns}
        moveColumnLeft={moveColumnLeft}
        moveColumnRight={moveColumnRight}
        deleteColumn={deleteColumn}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
      <div className={`max-w-full mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
        {/* Шапка с заголовком и кнопками */}
        <KanbanHeader 
          toggleDarkMode={toggleDarkMode} 
          darkMode={darkMode} 
          openSettings={() => setShowSettingsModal(true)} 
        />
        
        {/* Форма добавления новой задачи */}
        <NewTaskForm 
          newTaskText={newTaskText}
          setNewTaskText={setNewTaskText}
          newTaskColumn={newTaskColumn}
          setNewTaskColumn={setNewTaskColumn}
          newTaskPriority={newTaskPriority}
          setNewTaskPriority={setNewTaskPriority}
          addTask={addTask}
          columns={columns}
        />
        
        {/* Kanban-доска с горизонтальным скроллом */}
        <div className="mb-4" ref={boardRef}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
              Задачи ({filteredTasksCount})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Перетаскивайте задачи и колонки</span>
            </div>
          </div>
          
          <div className="flex overflow-x-auto pb-4 gap-4" style={{ minHeight: '500px' }}>
            {columns.map((column, columnIndex) => {
              const columnTasks = tasksByColumn[column] || [];
              const isDragOver = dragAndDrop.dragOverColumn === column;

              return (
                <Column
                  key={column}
                  column={column}
                  tasks={columnTasks}
                  onDragOver={(e) => dragAndDrop.handleColumnDragOver(e, column)}
                  onDrop={(e) => dragAndDrop.handleColumnDrop(e, column)}
                  onDragStart={dragAndDrop.handleTaskDragStart}
                  onDragEnd={dragAndDrop.handleTaskDragEnd}
                  onEditTask={startEditingTask}
                  onDeleteTask={deleteTask}
                  priorityColorClass={getPriorityColorClass}
                  isDragOver={isDragOver}
                  editingTask={editingTask}
                  editedTaskText={editedTaskText}
                  setEditedTaskText={setEditedTaskText}
                  saveEditedTask={saveEditedTask}
                  cancelEditing={cancelEditing}
                />
              );
            })}
          </div>
          
          {filteredTasksCount === 0 && <EmptyState />}
        </div>
      </div>
    </>
  );
}