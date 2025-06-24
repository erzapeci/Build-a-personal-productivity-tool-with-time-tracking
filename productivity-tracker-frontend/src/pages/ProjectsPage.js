import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, createProject, updateProject, deleteProject } from '../api/projects';
import '../styles/ProjectsPage.css';

export default function ProjectsPage() {
  // state-et
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [completedAt, setCompletedAt] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCreatedAt, setEditCreatedAt] = useState('');
  const [editCompletedAt, setEditCompletedAt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState('');
  const userEmail = localStorage.getItem('userEmail');

  // Merr projektet nga serveri
  const fetchProjects = async () => {
    try {
      const data = await getProjects(userEmail);
      setProjects(data);
      showNotification('✅ Projektet u ngarkuan me sukses!');
    } catch (error) {
      console.error('Error fetching projects:', error);
      showNotification('❌ Gabim gjatë ngarkimit të projekteve.');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Krijo projekt të ri
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !createdAt) {
      showNotification('❌ Ju lutemi plotësoni të gjitha fushat e detyrueshme!');
      return;
    }

    try {
      await createProject({
        title,
        description,
        userEmail,
        createdAt: new Date(createdAt),
        completedAt: completedAt ? new Date(completedAt) : null,
      });
      setTitle('');
      setDescription('');
      setCreatedAt('');
      setCompletedAt('');
      await fetchProjects();
      showNotification('✅ Projekti u regjistrua me sukses!');
    } catch (error) {
      console.error('Error creating project:', error);
      showNotification('❌ Gabim gjatë regjistrimit të projektit.');
    }
  };

  // Fshi projekt
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('A jeni i sigurt që dëshironi ta fshini këtë projekt?');
    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      await fetchProjects();
      showNotification('✅ Projekti u fshi me sukses!');
    } catch (error) {
      console.error('Error deleting project:', error);
      showNotification('❌ Gabim gjatë fshirjes së projektit.');
    }
  };

  // Hap modalin për përditësim
  const handleEditClick = (project) => {
    setEditingProject(project);
    setEditTitle(project.title);
    setEditDescription(project.description || '');
    setEditCreatedAt(formatDateTimeLocal(project.createdAt));
    setEditCompletedAt(project.completedAt ? formatDateTimeLocal(project.completedAt) : '');
    setShowModal(true);
  };

  // Përditëso projektin
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTitle || !editCreatedAt) {
      showNotification('❌ Ju lutemi plotësoni të gjitha fushat e detyrueshme!');
      return;
    }

    try {
      await updateProject(editingProject._id, {
        ...editingProject,
        title: editTitle,
        description: editDescription,
        createdAt: new Date(editCreatedAt),
        completedAt: editCompletedAt ? new Date(editCompletedAt) : null,
      });
      setShowModal(false);
      await fetchProjects();
      showNotification('✅ Projekti u përditësua me sukses!');
    } catch (error) {
      console.error('Error updating project:', error);
      showNotification('❌ Gabim gjatë përditësimit të projektit.');
    }
  };

  // Formato date për input e tipit datetime-local
  const formatDateTimeLocal = (date) => {
    const d = new Date(date);
    const offset = d.getTimezoneOffset();
    const localDate = new Date(d.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  // Formato date për shfaqje lexueshme
  const formatReadableDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('sq-AL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Funksion që kthen kohën e mbetur deri në përfundim
  const getTimeRemaining = (endDate) => {
    if (!endDate) return null;

    const total = new Date(endDate) - new Date();
    if (total <= 0) return '✅ Projekti është përfunduar';

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return `⏳ Mbeten ${days} ditë ${hours} orë ${minutes} min`;
  };

  return (
    <div className="projects-container">
      {notification && (
        <div className={`notification ${notification.includes('✅') ? 'success' : 'error'}`}>
          {notification}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>✏️ Përditëso Projektin</h3>
            <form onSubmit={handleUpdate}>
              <input
                placeholder="🎯 Titulli i Projektit"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
                autoFocus
              />
              <textarea
                placeholder="📝 Përshkrimi (opsional)"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
              />
              <input
                type="datetime-local"
                value={editCreatedAt}
                onChange={(e) => setEditCreatedAt(e.target.value)}
                required
              />
              <input
                type="datetime-local"
                value={editCompletedAt}
                onChange={(e) => setEditCompletedAt(e.target.value)}
                placeholder="🕒 Ora e Përfundimit (opsionale)"
              />
              <div className="modal-buttons">
                <button type="submit" className="btn-save">
                  💾 Ruaj Ndryshimet
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
                  ❌ Anulo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="projects-header">
        <h2>🚀 Projektet e Mia</h2>
        <Link to="/dashboard" className="back-button">
          ⬅ Kthehu në Dashboard
        </Link>
      </div>

      <form onSubmit={handleCreate} className="project-form">
        <input
          placeholder="🎯 Titulli i Projektit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="📝 Përshkrimi (opsional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <label>
          📅 Data e Krijimit:
          <input
            type="datetime-local"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            required
          />
        </label>
        <label>
          ⏳ Data e Përfundimit (opsionale):
          <input
            type="datetime-local"
            value={completedAt}
            onChange={(e) => setCompletedAt(e.target.value)}
          />
        </label>
        <button type="submit" className="btn-add">
          ➕ Shto Projekt
        </button>
      </form>

      <div className="projects-list">
        {projects.length === 0 && <p>📭 Nuk ka projekte të regjistruara.</p>}
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>👤 Përdoruesi: {project.userEmail}</p>
            <p>📅 Krijuar më: {formatReadableDate(project.createdAt)}</p>
            <p>
              🕒 Afati i Përfundimit:{' '}
              {project.completedAt ? formatReadableDate(project.completedAt) : 'Nuk është caktuar'}
            </p>
            <p>{getTimeRemaining(project.completedAt)}</p>
            <div className="project-actions">
              <button onClick={() => handleEditClick(project)} className="btn-edit">
                ✏️ Ndrysho
              </button>
              <button onClick={() => handleDelete(project._id)} className="btn-delete">
                🗑 Fshi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
