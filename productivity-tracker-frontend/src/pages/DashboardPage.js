import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { getTasks } from '../api/tasks';
import { getLogs } from '../api/timelogs';
import { getProjects } from '../api/projects';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const userEmail = localStorage.getItem('userEmail') || '';
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tasksData, logsData, projectsData] = await Promise.all([
        getTasks(userEmail),
        getLogs(userEmail),
        getProjects(userEmail)
      ]);
      setTasks(tasksData);
      setLogs(logsData);
      setProjects(projectsData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Gabim në marrjen e të dhënave:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userEmail]);

  const completedTasks = tasks.filter(task => task.status === 'complete').length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const calculateTotalHours = () => {
    return logs.reduce((total, log) => {
      const start = new Date(log.startTime);
      const end = new Date(log.endTime);
      return total + (end - start) / (1000 * 60 * 60);
    }, 0).toFixed(1);
  };

  const filterLogsByTimeRange = () => {
    const now = new Date();
    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return logs.filter(log => {
      const logDate = new Date(log.startTime);
      if (timeRange === 'today') {
        return logDate >= currentDate;
      } else if (timeRange === 'week') {
        const weekAgo = new Date(currentDate);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return logDate >= weekAgo;
      } else if (timeRange === 'month') {
        const monthAgo = new Date(currentDate);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return logDate >= monthAgo;
      }
      return true;
    });
  };

  const getTaskDistributionData = () => {
    const taskMap = {};
    logs.forEach(log => {
      if (!taskMap[log.taskTitle]) {
        taskMap[log.taskTitle] = 0;
      }
      const start = new Date(log.startTime);
      const end = new Date(log.endTime);
      taskMap[log.taskTitle] += (end - start) / (1000 * 60 * 60);
    });

    return Object.entries(taskMap).map(([name, value]) => ({
      name: name.length > 15 ? `${name.substring(0, 15)}...` : name,
      value: parseFloat(value.toFixed(2))
    }));
  };

  const getDayDistributionData = () => {
    const days = ['E Diel', 'E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtunë'];
    const dayMap = [0, 0, 0, 0, 0, 0, 0];

    filterLogsByTimeRange().forEach(log => {
      const dayIndex = new Date(log.startTime).getDay();
      const start = new Date(log.startTime);
      const end = new Date(log.endTime);
      dayMap[dayIndex] += (end - start) / (1000 * 60 * 60);
    });

    return days.map((day, index) => ({
      day,
      hours: parseFloat(dayMap[index].toFixed(2))
    }));
  };

  const getRecentTasks = () => {
    return [...tasks]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 5);
  };

  const getRecentLogs = () => {
    return [...logs]
      .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
      .slice(0, 5);
  };

  const getRecentProjects = () => {
    return [...projects]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <h2 className="logo">Productivity</h2>
        <ul className="nav-links">
          <li onClick={() => navigate('/dashboard')}>📊 Dashboard</li>
          <li onClick={() => navigate('/tasks')}>✅ Detyrat</li>
          <li onClick={() => navigate('/timelogs')}>⏱️ Koha</li>
          <li onClick={() => navigate('/projects')}>📁 Projekte</li>
          <li onClick={handleLogout}>🚪 Dalje</li>
        </ul>
      </div>

      <motion.div 
        className="dashboard-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">
          Përshëndetje, {userEmail} | Përditësuar: {lastUpdate.toLocaleTimeString()}
        </p>

        <motion.div 
          className="project-info-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>📌 Përmbledhje e Produktivitetit</h3>
          <div className="project-stats">
            <div>
              <span className="stat-number">{projects.length}</span>
              <span className="stat-label">Projekte</span>
            </div>
            <div>
              <span className="stat-number">{tasks.length}</span>
              <span className="stat-label">Detyra</span>
            </div>
            <div>
              <span className="stat-number">{completedTasks}</span>
              <span className="stat-label">Të kryera</span>
            </div>
            <div>
              <span className="stat-number">{calculateTotalHours()}h</span>
              <span className="stat-label">Kohë</span>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="loading-spinner">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                border: '5px solid #f3f3f3',
                borderTop: '5px solid #3498db'
              }}
            />
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📁</div>
                <div className="stat-value">{projects.length}</div>
                <div className="stat-label">Projekte</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-value">{completedTasks}</div>
                <div className="stat-label">Detyra të kryera</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-value">{completionPercentage}%</div>
                <div className="stat-label">Përqindje</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-value">{calculateTotalHours()}</div>
                <div className="stat-label">Orë</div>
              </div>
            </div>

            <div className="charts-section">
              <div className="chart-card">
                <h3>Shpërndarja e kohës sipas detyrave</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getTaskDistributionData()}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {getTaskDistributionData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Shpërndarja e orëve sipas ditëve</h3>
                <div className="time-range-selector">
                  <label>Filtro për: </label>
                  <select 
                    value={timeRange} 
                    onChange={e => setTimeRange(e.target.value)}
                    className="time-range-select"
                  >
                    <option value="today">Sot</option>
                    <option value="week">7 ditët e fundit</option>
                    <option value="month">30 ditët e fundit</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getDayDistributionData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="recent-section">
              <div className="recent-card">
                <h3>Projektet e fundit</h3>
                <ul>
                  {getRecentProjects().map(project => (
                    <li key={project._id} onClick={() => navigate(`/projects/${project._id}`)}>
                      <span className="project-title">{project.title}</span>
                      <span className="project-date">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="recent-card">
                <h3>Detyrat e fundit</h3>
                <ul>
                  {getRecentTasks().map(task => (
                    <li key={task._id} onClick={() => navigate(`/tasks`)}>
                      <span>{task.title}</span>
                      <span className={`status ${task.status}`}>
                        {task.status === 'complete' ? '✅' : '❌'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="recent-card">
                <h3>Koha e fundit e regjistruar</h3>
                <ul>
                  {getRecentLogs().map(log => (
                    <li key={log._id} onClick={() => navigate('/timelogs')}>
                      <span>{log.taskTitle}</span>
                      <span className="log-time">
                        {new Date(log.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardPage;
