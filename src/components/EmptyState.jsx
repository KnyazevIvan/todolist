import React from 'react';

function EmptyState() {
  return (
    <div className="text-center p-8 text-gray-500 dark:text-gray-400 border border-dashed dark:border-gray-700 rounded-lg">
      <p>Нет задач, соответствующих выбранным фильтрам</p>
    </div>
  );
}

export default EmptyState;