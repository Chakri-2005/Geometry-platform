import React, { useState, useRef, useEffect } from 'react';
import '../styles/GeometryCanvas.css';

const GeometryCanvas = () => {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);
  const [selectedTool, setSelectedTool] = useState('select');
  const [currentShape, setCurrentShape] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [properties, setProperties] = useState({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);
    
    // Draw all shapes
    shapes.forEach(shape => drawShape(ctx, shape));
    
    // Draw current shape if drawing
    if (isDrawing && currentShape) {
      drawShape(ctx, currentShape);
    }
  }, [shapes, currentShape, isDrawing]);

  const drawGrid = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Draw grid lines
    const gridSize = 20;
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawShape = (ctx, shape) => {
    ctx.strokeStyle = shape.color || '#4361ee';
    ctx.fillStyle = shape.fill || 'rgba(67, 97, 238, 0.2)';
    ctx.lineWidth = 2;
    
    switch (shape.type) {
      case 'rectangle':
        ctx.beginPath();
        ctx.rect(shape.x, shape.y, shape.width, shape.height);
        ctx.stroke();
        if (shape.fill) ctx.fill();
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.stroke();
        if (shape.fill) ctx.fill();
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(shape.x, shape.y);
        ctx.lineTo(shape.x + shape.width, shape.y + shape.height);
        ctx.lineTo(shape.x - shape.width, shape.y + shape.height);
        ctx.closePath();
        ctx.stroke();
        if (shape.fill) ctx.fill();
        break;
      case 'line':
        ctx.beginPath();
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        ctx.stroke();
        break;
      default:
        break;
    }
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setStartPoint({ x, y });
    
    if (selectedTool !== 'select') {
      setIsDrawing(true);
      
      const newShape = {
        type: selectedTool,
        x, y,
        color: '#4361ee',
        fill: 'rgba(67, 97, 238, 0.2)'
      };
      
      setCurrentShape(newShape);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentShape) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    let updatedShape = { ...currentShape };
    
    switch (currentShape.type) {
      case 'rectangle':
        updatedShape.width = x - startPoint.x;
        updatedShape.height = y - startPoint.y;
        break;
      case 'circle':
        updatedShape.radius = Math.sqrt(
          Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2)
        );
        break;
      case 'triangle':
        updatedShape.width = (x - startPoint.x) / 2;
        updatedShape.height = y - startPoint.y;
        break;
      case 'line':
        updatedShape.x2 = x;
        updatedShape.y2 = y;
        break;
      default:
        break;
    }
    
    setCurrentShape(updatedShape);
  };

  const handleMouseUp = () => {
    if (isDrawing && currentShape) {
      setShapes([...shapes, currentShape]);
      setIsDrawing(false);
      setCurrentShape(null);
      
      // Calculate properties for the new shape
      calculateProperties(currentShape);
    }
  };

  const calculateProperties = (shape) => {
    let area = 0, perimeter = 0;
    
    switch (shape.type) {
      case 'rectangle':
        area = Math.abs(shape.width * shape.height);
        perimeter = 2 * (Math.abs(shape.width) + Math.abs(shape.height));
        break;
      case 'circle':
        area = Math.PI * Math.pow(shape.radius, 2);
        perimeter = 2 * Math.PI * shape.radius;
        break;
      case 'triangle':
        // For simplicity, assuming right triangle
        area = 0.5 * Math.abs(shape.width) * Math.abs(shape.height);
        const hypotenuse = Math.sqrt(Math.pow(shape.width, 2) + Math.pow(shape.height, 2));
        perimeter = Math.abs(shape.width) + Math.abs(shape.height) + hypotenuse;
        break;
      default:
        break;
    }
    
    setProperties({
      type: shape.type,
      area: area.toFixed(2),
      perimeter: perimeter.toFixed(2),
      ...(shape.radius && { radius: shape.radius.toFixed(2) }),
      ...(shape.width && shape.height && { 
        width: Math.abs(shape.width).toFixed(2), 
        height: Math.abs(shape.height).toFixed(2) 
      })
    });
  };

  const clearCanvas = () => {
    setShapes([]);
    setProperties({});
  };

  const tools = [
    { id: 'select', label: 'Select', icon: 'fas fa-mouse-pointer' },
    { id: 'rectangle', label: 'Rectangle', icon: 'fas fa-square' },
    { id: 'circle', label: 'Circle', icon: 'fas fa-circle' },
    { id: 'triangle', label: 'Triangle', icon: 'fas fa-play' },
    { id: 'line', label: 'Line', icon: 'fas fa-minus' }
  ];

  return (
    <div className="geometry-canvas">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Interactive Geometry Canvas</h2>
          <button className="btn btn-secondary" onClick={clearCanvas}>
            <i className="fas fa-trash"></i>
            Clear Canvas
          </button>
        </div>
        
        <div className="canvas-container">
          <div className="toolbar">
            {tools.map(tool => (
              <button
                key={tool.id}
                className={`tool-btn ${selectedTool === tool.id ? 'active' : ''}`}
                onClick={() => setSelectedTool(tool.id)}
              >
                <i className={tool.icon}></i>
                <span>{tool.label}</span>
              </button>
            ))}
          </div>
          
          <div className="canvas-wrapper">
            <canvas
              ref={canvasRef}
              className="drawing-canvas"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>
          
          <div className="properties-panel">
            <h3>Shape Properties</h3>
            {Object.keys(properties).length > 0 ? (
              <div className="properties-list">
                <div className="property">
                  <span className="property-label">Type:</span>
                  <span className="property-value">{properties.type}</span>
                </div>
                {properties.area && (
                  <div className="property">
                    <span className="property-label">Area:</span>
                    <span className="property-value">{properties.area} units²</span>
                  </div>
                )}
                {properties.perimeter && (
                  <div className="property">
                    <span className="property-label">Perimeter:</span>
                    <span className="property-value">{properties.perimeter} units</span>
                  </div>
                )}
                {properties.radius && (
                  <div className="property">
                    <span className="property-label">Radius:</span>
                    <span className="property-value">{properties.radius} units</span>
                  </div>
                )}
                {properties.width && (
                  <div className="property">
                    <span className="property-label">Width:</span>
                    <span className="property-value">{properties.width} units</span>
                  </div>
                )}
                {properties.height && (
                  <div className="property">
                    <span className="property-label">Height:</span>
                    <span className="property-value">{properties.height} units</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="no-properties">Draw a shape to see its properties</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeometryCanvas;