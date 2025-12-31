import React, { useState } from 'react';
import '../styles/MeasurementTools.css';

const MeasurementTools = () => {
  const [activeTool, setActiveTool] = useState('ruler');
  const [measurements, setMeasurements] = useState([]);
  const [inputValues, setInputValues] = useState({
    length: '',
    width: '',
    radius: '',
    side1: '',
    side2: '',
    side3: '',
    base: '',
    height: ''
  });

  const tools = [
    { id: 'ruler', name: 'Ruler', icon: 'fas fa-ruler', description: 'Measure lengths and distances' },
    { id: 'protractor', name: 'Protractor', icon: 'fas fa-compass', description: 'Measure angles between lines' },
    { id: 'calculator', name: 'Calculator', icon: 'fas fa-calculator', description: 'Calculate area and perimeter' }
  ];

  const shapes = [
    { id: 'rectangle', name: 'Rectangle', formula: 'Area = length × width', perimeter: '2(length + width)' },
    { id: 'circle', name: 'Circle', formula: 'Area = π × radius²', perimeter: '2 × π × radius' },
    { id: 'triangle', name: 'Triangle', formula: 'Area = ½ × base × height', perimeter: 'side1 + side2 + side3' },
    { id: 'square', name: 'Square', formula: 'Area = side²', perimeter: '4 × side' }
  ];

  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  };

  const calculateArea = (shape) => {
    let area = 0, perimeter = 0;
    
    switch (shape) {
      case 'rectangle':
        area = parseFloat(inputValues.length) * parseFloat(inputValues.width);
        perimeter = 2 * (parseFloat(inputValues.length) + parseFloat(inputValues.width));
        break;
      case 'circle':
        area = Math.PI * Math.pow(parseFloat(inputValues.radius), 2);
        perimeter = 2 * Math.PI * parseFloat(inputValues.radius);
        break;
      case 'triangle':
        area = 0.5 * parseFloat(inputValues.base) * parseFloat(inputValues.height);
        perimeter = parseFloat(inputValues.side1) + parseFloat(inputValues.side2) + parseFloat(inputValues.side3);
        break;
      case 'square':
        area = Math.pow(parseFloat(inputValues.side1), 2);
        perimeter = 4 * parseFloat(inputValues.side1);
        break;
      default:
        break;
    }
    
    const newMeasurement = {
      id: Date.now(),
      shape,
      area: area.toFixed(2),
      perimeter: perimeter.toFixed(2),
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMeasurements([newMeasurement, ...measurements]);
  };

  const clearMeasurements = () => {
    setMeasurements([]);
  };

  const renderToolContent = () => {
    switch (activeTool) {
      case 'ruler':
        return (
          <div className="tool-content">
            <h3>Length Measurement</h3>
            <div className="ruler-visual">
              <div className="ruler">
                {Array.from({ length: 21 }, (_, i) => (
                  <div key={i} className="ruler-mark">
                    <div className="mark-line"></div>
                    <span className="mark-number">{i}</span>
                  </div>
                ))}
              </div>
              <div className="measurement-line"></div>
            </div>
            <div className="measurement-inputs">
              <div className="input-group">
                <label>Length (cm):</label>
                <input type="number" placeholder="Enter length" />
              </div>
              <button className="btn btn-primary">
                <i className="fas fa-ruler"></i>
                Measure
              </button>
            </div>
          </div>
        );
      
      case 'protractor':
        return (
          <div className="tool-content">
            <h3>Angle Measurement</h3>
            <div className="protractor-visual">
              <div className="protractor">
                <div className="angle-line base-line"></div>
                <div className="angle-line moving-line"></div>
                <div className="angle-value">45°</div>
              </div>
            </div>
            <div className="angle-controls">
              <div className="input-group">
                <label>Angle (°):</label>
                <input type="number" min="0" max="360" placeholder="Enter angle" />
              </div>
              <button className="btn btn-primary">
                <i className="fas fa-drafting-compass"></i>
                Set Angle
              </button>
            </div>
          </div>
        );
      
      case 'calculator':
        return (
          <div className="tool-content">
            <h3>Area & Perimeter Calculator</h3>
            <div className="calculator-grid">
              {shapes.map(shape => (
                <div key={shape.id} className="shape-calculator">
                  <h4>{shape.name}</h4>
                  <p className="formula">{shape.formula}</p>
                  <p className="perimeter">Perimeter: {shape.perimeter}</p>
                  
                  <div className="inputs">
                    {shape.id === 'rectangle' && (
                      <>
                        <div className="input-group">
                          <label>Length:</label>
                          <input 
                            type="number" 
                            name="length"
                            value={inputValues.length}
                            onChange={handleInputChange}
                            placeholder="Enter length" 
                          />
                        </div>
                        <div className="input-group">
                          <label>Width:</label>
                          <input 
                            type="number" 
                            name="width"
                            value={inputValues.width}
                            onChange={handleInputChange}
                            placeholder="Enter width" 
                          />
                        </div>
                      </>
                    )}
                    
                    {shape.id === 'circle' && (
                      <div className="input-group">
                        <label>Radius:</label>
                        <input 
                          type="number" 
                          name="radius"
                          value={inputValues.radius}
                          onChange={handleInputChange}
                          placeholder="Enter radius" 
                        />
                      </div>
                    )}
                    
                    {shape.id === 'triangle' && (
                      <>
                        <div className="input-group">
                          <label>Base:</label>
                          <input 
                            type="number" 
                            name="base"
                            value={inputValues.base}
                            onChange={handleInputChange}
                            placeholder="Enter base" 
                          />
                        </div>
                        <div className="input-group">
                          <label>Height:</label>
                          <input 
                            type="number" 
                            name="height"
                            value={inputValues.height}
                            onChange={handleInputChange}
                            placeholder="Enter height" 
                          />
                        </div>
                        <div className="input-group">
                          <label>Side 1:</label>
                          <input 
                            type="number" 
                            name="side1"
                            value={inputValues.side1}
                            onChange={handleInputChange}
                            placeholder="Enter side 1" 
                          />
                        </div>
                        <div className="input-group">
                          <label>Side 2:</label>
                          <input 
                            type="number" 
                            name="side2"
                            value={inputValues.side2}
                            onChange={handleInputChange}
                            placeholder="Enter side 2" 
                          />
                        </div>
                        <div className="input-group">
                          <label>Side 3:</label>
                          <input 
                            type="number" 
                            name="side3"
                            value={inputValues.side3}
                            onChange={handleInputChange}
                            placeholder="Enter side 3" 
                          />
                        </div>
                      </>
                    )}
                    
                    {shape.id === 'square' && (
                      <div className="input-group">
                        <label>Side:</label>
                        <input 
                          type="number" 
                          name="side1"
                          value={inputValues.side1}
                          onChange={handleInputChange}
                          placeholder="Enter side length" 
                        />
                      </div>
                    )}
                  </div>
                  
                  <button 
                    className="btn btn-primary calculate-btn"
                    onClick={() => calculateArea(shape.id)}
                  >
                    Calculate
                  </button>
                </div>
              ))}
            </div>
            
            {measurements.length > 0 && (
              <div className="measurements-history">
                <div className="history-header">
                  <h4>Calculation History</h4>
                  <button className="btn btn-secondary" onClick={clearMeasurements}>
                    Clear All
                  </button>
                </div>
                <div className="measurements-list">
                  {measurements.map(measurement => (
                    <div key={measurement.id} className="measurement-item">
                      <div className="measurement-shape">{measurement.shape}</div>
                      <div className="measurement-values">
                        <span>Area: {measurement.area} units²</span>
                        <span>Perimeter: {measurement.perimeter} units</span>
                      </div>
                      <div className="measurement-time">{measurement.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="measurement-tools">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Measurement Tools</h2>
        </div>
        
        <div className="tools-container">
          <div className="tools-sidebar">
            {tools.map(tool => (
              <button
                key={tool.id}
                className={`tool-item ${activeTool === tool.id ? 'active' : ''}`}
                onClick={() => setActiveTool(tool.id)}
              >
                <i className={tool.icon}></i>
                <span className="tool-name">{tool.name}</span>
                <span className="tool-desc">{tool.description}</span>
              </button>
            ))}
          </div>
          
          <div className="tools-main">
            {renderToolContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementTools;