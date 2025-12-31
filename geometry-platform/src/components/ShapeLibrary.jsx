import React, { useState } from 'react';
import '../styles/ShapeLibrary.css';

const ShapeLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const shapes = [
    {
      id: 1,
      name: 'Square',
      category: 'quadrilateral',
      sides: 4,
      angles: '90° each',
      area: 'a²',
      perimeter: '4a',
      properties: ['All sides equal', 'All angles 90°', 'Diagonals equal and bisect each other']
    },
    {
      id: 2,
      name: 'Rectangle',
      category: 'quadrilateral',
      sides: 4,
      angles: '90° each',
      area: 'l × w',
      perimeter: '2(l + w)',
      properties: ['Opposite sides equal', 'All angles 90°', 'Diagonals equal and bisect each other']
    },
    {
      id: 3,
      name: 'Triangle',
      category: 'triangle',
      sides: 3,
      angles: 'Sum 180°',
      area: '½ × b × h',
      perimeter: 'a + b + c',
      properties: ['Three sides', 'Three angles', 'Sum of angles is 180°']
    },
    {
      id: 4,
      name: 'Circle',
      category: 'round',
      sides: 'Infinite',
      angles: 'N/A',
      area: 'πr²',
      perimeter: '2πr',
      properties: ['All points equidistant from center', 'No edges or vertices', 'Constant curvature']
    },
    {
      id: 5,
      name: 'Pentagon',
      category: 'polygon',
      sides: 5,
      angles: '108° each (regular)',
      area: '¼√(5(5+2√5))a²',
      perimeter: '5a',
      properties: ['Five sides', 'Sum of angles 540°', 'Can be regular or irregular']
    },
    {
      id: 6,
      name: 'Hexagon',
      category: 'polygon',
      sides: 6,
      angles: '120° each (regular)',
      area: '(3√3/2)a²',
      perimeter: '6a',
      properties: ['Six sides', 'Sum of angles 720°', 'Common in nature (honeycomb)']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Shapes' },
    { id: 'quadrilateral', name: 'Quadrilaterals' },
    { id: 'triangle', name: 'Triangles' },
    { id: 'polygon', name: 'Polygons' },
    { id: 'round', name: 'Round Shapes' }
  ];

  const filteredShapes = selectedCategory === 'all' 
    ? shapes 
    : shapes.filter(shape => shape.category === selectedCategory);

  return (
    <div className="shape-library">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Shape Library</h2>
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search shapes..." />
          </div>
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="shapes-grid">
          {filteredShapes.map(shape => (
            <div key={shape.id} className="shape-card">
              <div className="shape-header">
                <div className="shape-icon">
                  <i className={`fas fa-${getShapeIcon(shape.name)}`}></i>
                </div>
                <h3 className="shape-name">{shape.name}</h3>
              </div>
              
              <div className="shape-details">
                <div className="detail">
                  <span className="detail-label">Sides:</span>
                  <span className="detail-value">{shape.sides}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Angles:</span>
                  <span className="detail-value">{shape.angles}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Area:</span>
                  <span className="detail-value">{shape.area}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Perimeter:</span>
                  <span className="detail-value">{shape.perimeter}</span>
                </div>
              </div>
              
              <div className="shape-properties">
                <h4>Properties:</h4>
                <ul>
                  {shape.properties.map((prop, index) => (
                    <li key={index}>{prop}</li>
                  ))}
                </ul>
              </div>
              
              <button className="btn btn-primary explore-btn">
                <i className="fas fa-cube"></i>
                Explore in 3D
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get appropriate icon for each shape
const getShapeIcon = (shapeName) => {
  const iconMap = {
    'Square': 'square',
    'Rectangle': 'rectangle-landscape',
    'Triangle': 'play', // triangle icon is not available in free FontAwesome
    'Circle': 'circle',
    'Pentagon': 'draw-polygon',
    'Hexagon': 'hexagon'
  };
  
  return iconMap[shapeName] || 'shapes';
};

export default ShapeLibrary;