// src/pages/TimeLogsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLogs, addLog, deleteLog, updateLog } from '../api/timelogs';
import '../styles/TimeLogsPage.css';

const TimeLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState(null);

  const userEmail = localStorage.getItem('userEmail') || '';

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getLogs(userEmail);
      const sorted = [...data].sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
      setLogs(sorted);
    } catch (error) {
      console.error('Gabim në marrjen e time logs:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) fetchData();
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskTitle || !startTime || !endTime) {
      alert('Ju lutem plotësoni të gjitha fushat.');
      return;
    }

    try {
      if (selectedLog) {
        await updateLog(selectedLog._id, {
          userEmail,
          taskTitle,
          startTime,
          endTime,
        });
        alert('✅ Regjistrimi u përditësua me sukses!');
        setSelectedLog(null);
      } else {
        await addLog({ userEmail, taskTitle, startTime, endTime });
        alert('✅ Regjistrimi u shtua me sukses!');
      }

      setTaskTitle('');
      setStartTime('');
      setEndTime('');
      await fetchData();
    } catch (error) {
      alert('❌ Gabim gjatë ruajtjes!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt që doni të fshini këtë regjistrim?')) {
      try {
        await deleteLog(id);
        await fetchData();
      } catch (error) {
        alert('❌ Gabim gjatë fshirjes!');
      }
    }
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate - startDate;
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}min`;
  };

  const isToday = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isThisWeek = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();

    const first = now.getDate() - ((now.getDay() + 6) % 7);
    const startOfWeek = new Date(now.setDate(first));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return date >= startOfWeek && date <= endOfWeek;
  };

  const filteredLogs = logs.filter(log => {
    if (filter === 'today') return isToday(log.startTime);
    if (filter === 'week') return isThisWeek(log.startTime);
    return true;
  });

  return (
    <div className="timelogs-container">
      <div className="timelogs-header">
        <h2>Regjistrimet e mia të kohës</h2>
        <Link to="/dashboard" className="back-button">Kthehu në Dashboard</Link>
      </div>

      <form onSubmit={handleSubmit} className="timelog-form">
        <div className="form-group">
          <label>Detyra:</label>
          <input
            type="text"
            placeholder="Titulli i detyrës"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Koha e fillimit:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Koha e përfundimit:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          {selectedLog ? '💾 Ruaj Ndryshimet' : '➕ Shto Regjistrim'}
        </button>
        {selectedLog && (
          <button
            type="button"
            className="cancel-button"
            onClick={() => {
              setSelectedLog(null);
              setTaskTitle('');
              setStartTime('');
              setEndTime('');
            }}
          >
            ❌ Anulo
          </button>
        )}
      </form>

      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Të gjitha</button>
        <button className={filter === 'today' ? 'active' : ''} onClick={() => setFilter('today')}>Sot</button>
        <button className={filter === 'week' ? 'active' : ''} onClick={() => setFilter('week')}>Kjo javë</button>
      </div>

      {loading ? (
        <div className="loading">Duke u ngarkuar...</div>
      ) : (
        <div className="logs-table-container">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Detyra</th>
                <th>Fillimi</th>
                <th>Përfundimi</th>
                <th>Kohëzgjatja</th>
                <th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log._id} className="log-row">
                    <td>{log.taskTitle}</td>
                    <td>{new Date(log.startTime).toLocaleString()}</td>
                    <td>{new Date(log.endTime).toLocaleString()}</td>
                    <td>{calculateDuration(log.startTime, log.endTime)}</td>
                    <td>
                      <button
                        onClick={() => {
                          setSelectedLog(log);
                          setTaskTitle(log.taskTitle);
                          setStartTime(log.startTime.slice(0, 16));
                          setEndTime(log.endTime.slice(0, 16));
                        }}
                        className="edit-button"
                      >
                        Përditëso
                      </button>
                      <button
                        onClick={() => handleDelete(log._id)}
                        className="delete-button"
                      >
                        Fshij
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-logs">
                    Nuk ka regjistrime të kohës për të shfaqur
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TimeLogsPage;
