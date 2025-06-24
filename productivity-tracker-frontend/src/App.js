import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import TimeLogsPage from './pages/TimeLogsPage';
import ProjectsPage from './pages/ProjectsPage'; // Import projekti

function NotFoundPage() {
  return <h2>404 - Page Not Found</h2>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/timelogs" element={<TimeLogsPage />} />
        <Route path="/projects" element={<ProjectsPage />} /> {/* Rruga për Projects */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
