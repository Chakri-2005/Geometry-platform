import React, { useState } from 'react';
import GeometryCanvas from './GeometryCanvas';
import ShapeLibrary from './ShapeLibrary';
import MeasurementTools from './MeasurementTools';
import QuizComponent from './QuizComponent';
import '../styles/Dashboard.css';

const Dashboard = ({ user = {}, onLogout }) => {
  const [activeTab, setActiveTab] = useState('canvas');

  const tabs = [
    { id: 'canvas', label: 'Geometry Canvas', icon: 'fas fa-draw-polygon' },
    { id: 'shapes', label: 'Shape Library', icon: 'fas fa-shapes' },
    { id: 'measure', label: 'Measurements', icon: 'fas fa-ruler-combined' },
    { id: 'quiz', label: 'Quizzes', icon: 'fas fa-puzzle-piece' }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="brand">
              <i className="fas fa-shapes"></i>
              <span>GeoLearn</span>
            </div>
            
            <div className="user-info">
              <div className="user-details">
                <span className="welcome">Welcome, {user?.name || 'Guest'}</span>
                <span className="grade">{user?.grade ? `Grade: ${user.grade}` : ''}</span>
              </div>
              <button className="btn btn-secondary logout-btn" onClick={onLogout}>
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <div className="container">
          <div className="nav-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="container">
          {activeTab === 'canvas' && <GeometryCanvas />}
          {activeTab === 'shapes' && <ShapeLibrary />}
          {activeTab === 'measure' && <MeasurementTools />}
          {activeTab === 'quiz' && <QuizComponent />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
