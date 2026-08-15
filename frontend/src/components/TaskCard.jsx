import React from 'react';

export default function TaskCard({ task, onEdit, onDelete, onMove, columns }) {
  const currentStatusIndex = columns.indexOf(task.status);

  return (
    <div className="task-card">
      <h3>{task.titulo}</h3>
      {task.descricao && <p>{task.descricao}</p>}
      
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Editar</button>
        <button onClick={() => onDelete(task.id)}>Excluir</button>
      </div>
      
      <div className="task-moves">
        {task.status !== "A Fazer" && (
          <button 
            title="Mover para a esquerda"
            onClick={() => onMove(task, columns[currentStatusIndex - 1])}
          >
            ⬅️
          </button>
        )}
        {task.status !== "Concluídas" && (
          <button 
            title="Mover para a direita"
            onClick={() => onMove(task, columns[currentStatusIndex + 1])}
          >
            ➡️
          </button>
        )}
      </div>
    </div>
  );
}