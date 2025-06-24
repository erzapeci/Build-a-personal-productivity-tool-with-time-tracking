import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import '../styles/TasksPage.css';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const userEmail = localStorage.getItem('userEmail');

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchTasks = async () => {
    try {
      const data = await getTasks(userEmail);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      showNotification('Gabim gjatë marrjes së detyrave.', 'error');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title) return;
    
    try {
      await createTask({ title, description, userEmail, status: 'incomplete' });
      setTitle('');
      setDescription('');
      await fetchTasks();
      showNotification('Detyra u shtua me sukses!');
    } catch (error) {
      console.error('Error creating task:', error);
      showNotification('Gabim gjatë shtimit të detyrës.', 'error');
    }
  };

  const handleToggle = async (task) => {
    try {
      const updatedStatus = task.status === 'incomplete' ? 'complete' : 'incomplete';
      await updateTask(task._id, { ...task, status: updatedStatus });
      await fetchTasks();
      showNotification('Statusi i detyrës u përditësua me sukses!');
    } catch (error) {
      console.error('Error updating task:', error);
      showNotification('Gabim gjatë përditësimit të statusit.', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      await fetchTasks();
      showNotification('Detyra u fshi me sukses!');
    } catch (error) {
      console.error('Error deleting task:', error);
      showNotification('Gabim gjatë fshirjes së detyrës.', 'error');
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTitle) return;
    
    try {
      await updateTask(editingTask._id, {
        ...editingTask,
        title: editTitle,
        description: editDescription
      });
      setShowModal(false);
      await fetchTasks();
      showNotification('Detyra u përditësua me sukses!');
    } catch (error) {
      console.error('Error updating task:', error);
      showNotification('Gabim gjatë përditësimit të detyrës.', 'error');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-container">

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Modal për përditësim */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Përditëso Detyrën</h3>
            <form onSubmit={handleUpdate}>
              <input
                placeholder="Titulli i Detyrës"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Përshkrimi (opsional)"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <div className="modal-buttons">
                <button type="submit">Ruaj Ndryshimet</button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="cancel-button"
                >
                  Anulo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="tasks-header">
        <h2>Detyrat e Mia</h2>
        <Link to="/dashboard" className="back-button">Kthehu në Dashboard</Link>
      </div>

      <div className="task-filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Të Gjitha
        </button>
        <button 
          className={filter === 'incomplete' ? 'active' : ''}
          onClick={() => setFilter('incomplete')}
        >
          Aktive
        </button>
        <button 
          className={filter === 'complete' ? 'active' : ''}
          onClick={() => setFilter('complete')}
        >
          Të Kryera
        </button>
      </div>

      <form onSubmit={handleCreate} className="task-form">
        <input
          placeholder="Titulli i Detyrës"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Përshkrimi (opsional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Shto Detyrë</button>
      </form>

      <div className="tasks-list">
        {filteredTasks.length === 0 ? (
          <p className="no-tasks">Nuk ka detyra për të shfaqur</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task._id} className={`task-item ${task.status}`}>
              <div className="task-content">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                <span className="task-status">
                  {task.status === 'complete' ? '✅ E kryer' : '🟡 Në pritje'}
                </span>
              </div>
              <div className="task-actions">
                <button 
                  onClick={() => handleToggle(task)}
                  className="toggle-button"
                >
                  {task.status === 'incomplete' ? 'Shëno si të kryer' : 'Shëno si të papërfunduar'}
                </button>
                <button 
                  onClick={() => handleEditClick(task)}
                  className="update-button"
                >
                  Përditëso
                </button>
                <button 
                  onClick={() => handleDelete(task._id)}
                  className="delete-button"
                >
                  Fshi
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
