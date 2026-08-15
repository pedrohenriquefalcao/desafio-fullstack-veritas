import React from 'react';
import TaskCard from './TaskCard';

export default function KanbanColumn({ title, tasks, onEdit, onDelete, onMove, columns }) {
  
  const obterClasseDaColuna = (status) => {
    switch (status) {
      case "A Fazer": return "coluna-a-fazer";
      case "Em Progresso": return "coluna-em-progresso";
      case "Concluídas": return "coluna-concluidas";
      default: return "";
    }
  };

  return (
    <div className={`kanban-column ${obterClasseDaColuna(title)}`}>
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onEdit={onEdit} 
            onDelete={onDelete} 
            onMove={onMove}
            columns={columns}
          />
        ))}
      </div>
    </div>
  );
}