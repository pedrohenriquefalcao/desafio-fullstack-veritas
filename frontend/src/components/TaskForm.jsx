import React, { useState, useEffect } from 'react';

const estadoInicial = { id: null, titulo: '', descricao: '', status: 'A Fazer' };

export default function TaskForm({ onSubmit, taskToEdit, onCancel, columns }) {
  const [formData, setFormData] = useState(estadoInicial);

  useEffect(() => {
    if (taskToEdit) {
      setFormData(taskToEdit);
    } else {
      setFormData(estadoInicial);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim()) {
      alert("O título é obrigatório!");
      return;
    }
    onSubmit(formData);
    setFormData(estadoInicial); 
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input 
        type="text" 
        placeholder="Título da Tarefa" 
        value={formData.titulo} 
        onChange={(e) => setFormData({...formData, titulo: e.target.value})}
        required 
      />
      <input 
        type="text" 
        placeholder="Descrição" 
        value={formData.descricao} 
        onChange={(e) => setFormData({...formData, descricao: e.target.value})} 
      />
      <select 
        value={formData.status} 
        onChange={(e) => setFormData({...formData, status: e.target.value})}
      >
        {columns.map(col => <option key={col} value={col}>{col}</option>)}
      </select>
      
      <button type="submit">
        {taskToEdit ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
      </button>
      
      {taskToEdit && (
        <button 
          type="button" 
          className="btn-cancel"
          onClick={() => {
            setFormData(estadoInicial);
            onCancel();
          }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}