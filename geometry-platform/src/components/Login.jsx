import React, { useState } from 'react';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: '',
    password: ''
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: formData.name,
      email: formData.email,
      grade: formData.grade
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <i className="fas fa-shapes"></i>
          <span>GeoLearn</span>
        </div>
        
        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <p>{isSignUp ? 'Join our geometry learning platform' : 'Sign in to continue your geometry journey'}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-with-icon">
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          
          {isSignUp && (
            <div className="input-group">
              <label htmlFor="grade">Grade Level</label>
              <div className="input-with-icon">
                <i className="fas fa-graduation-cap"></i>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your grade</option>
                  <option value="Elementary">Elementary School</option>
                  <option value="Middle">Middle School</option>
                  <option value="High">High School</option>
                  <option value="College">College</option>
                </select>
              </div>
            </div>
          )}
          
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary login-btn">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <span className="toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? ' Sign In' : ' Sign Up'}
            </span>
          </p>
        </div>
        
        <div className="features-preview">
          <h3>Explore Geometry With Us</h3>
          <div className="features-grid">
            <div className="feature">
              <i className="fas fa-draw-polygon"></i>
              <span>Interactive Shapes</span>
            </div>
            <div className="feature">
              <i className="fas fa-ruler-combined"></i>
              <span>Measure Tools</span>
            </div>
            <div className="feature">
              <i className="fas fa-puzzle-piece"></i>
              <span>Challenging Quizzes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;