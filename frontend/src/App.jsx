import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:8080/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ id: null, titulo: '', descricao: '', status: 'A Fazer' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data || []);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titulo.trim()) {
      alert("O título é obrigatório!");
      return;
    }

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/${formData.id}` : API_URL;

    try {
      await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: formData.status
        })
      });
      
      setFormData({ id: null, titulo: '', descricao: '', status: 'A Fazer' });
      setIsEditing(false);
      fetchTasks(); 
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta tarefa?")) return;
    
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  // PUT
  const handleMove = async (task, newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    try {
      await fetch(`${API_URL}/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      });
      fetchTasks();
    } catch (error) {
      console.error("Erro ao mover tarefa:", error);
    }
  };

  const handleEditClick = (task) => {
    setFormData(task);
    setIsEditing(true);
  };

  const columns = ["A Fazer", "Em Progresso", "Concluídas"];

  const obterClasseDaColuna = (status) => {
    switch (status) {
      case "A Fazer": return "coluna-a-fazer";
      case "Em Progresso": return "coluna-em-progresso";
      case "Concluídas": return "coluna-concluidas";
      default: return "";
    }
  };
  
  return (
    <div className="app-container">
      <h1>Kanban Desafio Fullstack Veritas</h1>
      
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
          {isEditing ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
        </button>
        
        {isEditing && (
          <button 
            type="button" 
            className="btn-cancel"
            onClick={() => { 
              setIsEditing(false); 
              setFormData({ id: null, titulo: '', descricao: '', status: 'A Fazer' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="kanban-board">
        {columns.map(status => (
          <div key={status} className={`kanban-column ${obterClasseDaColuna(status)}`}>
            <h2>{status}</h2>
            <div className="task-list">
              {tasks.filter(task => task.status === status).map(task => (
                <div key={task.id} className="task-card">
                  <h3>{task.titulo}</h3>
                  {task.descricao && <p>{task.descricao}</p>}
                  
                  <div className="task-actions">
                    <button onClick={() => handleEditClick(task)}>Editar</button>
                    <button onClick={() => handleDelete(task.id)}>Excluir</button>
                  </div>
                  
                  <div className="task-moves">
                    {status !== "A Fazer" && (
                      <button 
                        title="Mover para a esquerda"
                        onClick={() => handleMove(task, columns[columns.indexOf(status) - 1])}
                      >
                        ⬅️
                      </button>
                    )}
                    {status !== "Concluídas" && (
                      <button 
                        title="Mover para a direita"
                        onClick={() => handleMove(task, columns[columns.indexOf(status) + 1])}
                      >
                        ➡️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;