import { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import KanbanColumn from './components/KanbanColumn';

const API_URL = 'http://localhost:8080/tasks';
const COLUMNS = ["A Fazer", "Em Progresso", "Concluídas"];

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

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

  const handleSaveTask = async (taskData) => {
    const isEditing = !!taskData.id;
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/${taskData.id}` : API_URL;

    try {
      await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      setTaskToEdit(null); 
      fetchTasks(); 
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta tarefa?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const handleMoveTask = async (task, newStatus) => {
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

  return (
    <div className="app-container">
      <h1>Kanban Desafio Fullstack Veritas</h1>
      
      <TaskForm 
        onSubmit={handleSaveTask} 
        taskToEdit={taskToEdit} 
        onCancel={() => setTaskToEdit(null)}
        columns={COLUMNS}
      />

      <div className="kanban-board">
        {COLUMNS.map(status => (
          <KanbanColumn 
            key={status}
            title={status}
            columns={COLUMNS}
            tasks={tasks.filter(task => task.status === status)}
            onEdit={setTaskToEdit}
            onDelete={handleDeleteTask}
            onMove={handleMoveTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;