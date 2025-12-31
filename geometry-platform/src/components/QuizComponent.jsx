import React, { useState } from 'react';
import '../styles/QuizComponent.css';

const QuizComponent = () => {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const quizzes = [
    {
      id: 1,
      title: 'Basic Shapes',
      level: 'Beginner',
      questions: 5,
      description: 'Test your knowledge of basic geometric shapes',
      icon: 'fas fa-shapes'
    },
    {
      id: 2,
      title: 'Angles & Measurements',
      level: 'Intermediate',
      questions: 7,
      description: 'Challenge yourself with angle calculations',
      icon: 'fas fa-angle-right'
    },
    {
      id: 3,
      title: 'Area & Perimeter',
      level: 'Advanced',
      questions: 8,
      description: 'Master area and perimeter calculations',
      icon: 'fas fa-ruler-combined'
    },
    {
      id: 4,
      title: '3D Geometry',
      level: 'Expert',
      questions: 6,
      description: 'Explore three-dimensional shapes',
      icon: 'fas fa-cube'
    }
  ];

  const questionsData = {
    1: [
      {
        question: 'How many sides does a triangle have?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 1,
        explanation: 'A triangle has 3 sides and 3 angles.'
      },
      {
        question: 'Which shape has all sides equal and all angles 90 degrees?',
        options: ['Rectangle', 'Circle', 'Square', 'Triangle'],
        correctAnswer: 2,
        explanation: 'A square has all sides equal and all angles are 90 degrees.'
      },
      {
        question: 'What is the name of a shape with 5 sides?',
        options: ['Hexagon', 'Pentagon', 'Octagon', 'Decagon'],
        correctAnswer: 1,
        explanation: 'A pentagon is a polygon with 5 sides.'
      },
      {
        question: 'Which of these is not a quadrilateral?',
        options: ['Square', 'Rectangle', 'Triangle', 'Rhombus'],
        correctAnswer: 2,
        explanation: 'A triangle has 3 sides, so it is not a quadrilateral (which has 4 sides).'
      },
      {
        question: 'What is the sum of all angles in a triangle?',
        options: ['90°', '180°', '270°', '360°'],
        correctAnswer: 1,
        explanation: 'The sum of all angles in any triangle is always 180 degrees.'
      }
    ],
    2: [
      {
        question: 'What is the measure of a right angle?',
        options: ['45°', '90°', '180°', '360°'],
        correctAnswer: 1,
        explanation: 'A right angle measures exactly 90 degrees.'
      },
      {
        question: 'If two angles are complementary, their sum is:',
        options: ['90°', '180°', '270°', '360°'],
        correctAnswer: 0,
        explanation: 'Complementary angles add up to 90 degrees.'
      },
      {
        question: 'An angle measuring 135° is:',
        options: ['Acute', 'Right', 'Obtuse', 'Straight'],
        correctAnswer: 2,
        explanation: 'An obtuse angle is greater than 90° but less than 180°.'
      },
      {
        question: 'What is the measure of each interior angle in a regular hexagon?',
        options: ['60°', '90°', '120°', '135°'],
        correctAnswer: 2,
        explanation: 'A regular hexagon has interior angles of 120° each.'
      },
      {
        question: 'If two lines are perpendicular, they form:',
        options: ['Acute angles', 'Right angles', 'Obtuse angles', 'Straight angles'],
        correctAnswer: 1,
        explanation: 'Perpendicular lines intersect at right angles (90°).'
      }
    ],
    3: [
      {
        question: 'What is the area of a rectangle with length 8cm and width 5cm?',
        options: ['13 cm²', '26 cm²', '40 cm²', '45 cm²'],
        correctAnswer: 2,
        explanation: 'Area of rectangle = length × width = 8 × 5 = 40 cm²'
      },
      {
        question: 'The perimeter of a square with side 6cm is:',
        options: ['12 cm', '24 cm', '36 cm', '48 cm'],
        correctAnswer: 1,
        explanation: 'Perimeter of square = 4 × side = 4 × 6 = 24 cm'
      },
      {
        question: 'What is the area of a circle with radius 7cm? (Use π = 22/7)',
        options: ['44 cm²', '88 cm²', '154 cm²', '308 cm²'],
        correctAnswer: 2,
        explanation: 'Area of circle = πr² = (22/7) × 7 × 7 = 154 cm²'
      },
      {
        question: 'If the area of a triangle is 24 cm² and its base is 8cm, what is its height?',
        options: ['3 cm', '6 cm', '8 cm', '12 cm'],
        correctAnswer: 1,
        explanation: 'Area = ½ × base × height → 24 = ½ × 8 × h → h = 6 cm'
      }
    ],
    4: [
      {
        question: 'How many faces does a cube have?',
        options: ['4', '6', '8', '12'],
        correctAnswer: 1,
        explanation: 'A cube has 6 faces, all of which are squares.'
      },
      {
        question: 'Which 3D shape has a circular base and a vertex?',
        options: ['Cylinder', 'Sphere', 'Cone', 'Pyramid'],
        correctAnswer: 2,
        explanation: 'A cone has a circular base and a single vertex.'
      },
      {
        question: 'What is the volume of a cube with side length 3cm?',
        options: ['9 cm³', '18 cm³', '27 cm³', '36 cm³'],
        correctAnswer: 2,
        explanation: 'Volume of cube = side³ = 3 × 3 × 3 = 27 cm³'
      },
      {
        question: 'How many edges does a triangular prism have?',
        options: ['6', '9', '12', '15'],
        correctAnswer: 1,
        explanation: 'A triangular prism has 9 edges.'
      }
    ]
  };

  const startQuiz = (quizId) => {
    setActiveQuiz(quizId);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setUserAnswers([]);
  };

  const handleAnswer = (answerIndex) => {
    const isCorrect = answerIndex === questionsData[activeQuiz][currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setUserAnswers([...userAnswers, {
      question: currentQuestion,
      answer: answerIndex,
      correct: isCorrect
    }]);
    
    if (currentQuestion + 1 < questionsData[activeQuiz].length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
  };

  const renderQuizList = () => (
    <div className="quiz-list">
      <h2>Geometry Quizzes</h2>
      <p className="quiz-subtitle">Test your geometry knowledge with these interactive quizzes</p>
      
      <div className="quizzes-grid">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="quiz-card">
            <div className="quiz-icon">
              <i className={quiz.icon}></i>
            </div>
            <div className="quiz-info">
              <h3>{quiz.title}</h3>
              <div className="quiz-meta">
                <span className="level-badge">{quiz.level}</span>
                <span className="questions-count">{quiz.questions} questions</span>
              </div>
              <p className="quiz-description">{quiz.description}</p>
            </div>
            <button 
              className="btn btn-primary start-quiz-btn"
              onClick={() => startQuiz(quiz.id)}
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuiz = () => {
    if (showResults) {
      return renderResults();
    }
    
    const question = questionsData[activeQuiz][currentQuestion];
    const progress = ((currentQuestion + 1) / questionsData[activeQuiz].length) * 100;
    
    return (
      <div className="quiz-interface">
        <div className="quiz-header">
          <button className="btn btn-secondary" onClick={resetQuiz}>
            <i className="fas fa-arrow-left"></i>
            Back to Quizzes
          </button>
          <div className="quiz-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">
              Question {currentQuestion + 1} of {questionsData[activeQuiz].length}
            </span>
          </div>
        </div>
        
        <div className="question-card">
          <h3 className="question-text">{question.question}</h3>
          
          <div className="options-grid">
            {question.options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleAnswer(index)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const totalQuestions = questionsData[activeQuiz].length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    let resultMessage = '';
    let resultIcon = '';
    
    if (percentage >= 90) {
      resultMessage = 'Excellent! You are a geometry master!';
      resultIcon = 'fas fa-trophy';
    } else if (percentage >= 70) {
      resultMessage = 'Great job! You have a solid understanding.';
      resultIcon = 'fas fa-star';
    } else if (percentage >= 50) {
      resultMessage = 'Good effort! Keep practicing.';
      resultIcon = 'fas fa-thumbs-up';
    } else {
      resultMessage = 'Keep learning! You can improve with practice.';
      resultIcon = 'fas fa-redo';
    }
    
    return (
      <div className="results-screen">
        <div className="results-card">
          <div className="results-header">
            <i className={resultIcon}></i>
            <h2>Quiz Complete!</h2>
          </div>
          
          <div className="score-display">
            <div className="score-circle">
              <span className="score-percentage">{percentage}%</span>
              <span className="score-text">Score</span>
            </div>
            <p className="score-detail">
              You got {score} out of {totalQuestions} questions correct
            </p>
          </div>
          
          <p className="result-message">{resultMessage}</p>
          
          <div className="results-actions">
            <button className="btn btn-primary" onClick={() => startQuiz(activeQuiz)}>
              <i className="fas fa-redo"></i>
              Try Again
            </button>
            <button className="btn btn-secondary" onClick={resetQuiz}>
              <i className="fas fa-list"></i>
              Other Quizzes
            </button>
          </div>
          
          <div className="answers-review">
            <h3>Review Your Answers</h3>
            <div className="answers-list">
              {questionsData[activeQuiz].map((question, index) => {
                const userAnswer = userAnswers.find(a => a.question === index);
                const isCorrect = userAnswer?.correct;
                
                return (
                  <div key={index} className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="answer-status">
                      <i className={`fas fa-${isCorrect ? 'check' : 'times'}`}></i>
                    </div>
                    <div className="answer-details">
                      <p className="question-review">{question.question}</p>
                      <p className="correct-answer">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                      {!isCorrect && userAnswer && (
                        <p className="your-answer">
                          Your answer: {question.options[userAnswer.answer]}
                        </p>
                      )}
                      <p className="explanation">{question.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="quiz-component">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Geometry Quizzes</h2>
          {activeQuiz && !showResults && (
            <div className="current-score">
              Score: <span className="score-value">{score}</span>
            </div>
          )}
        </div>
        
        <div className="quiz-content">
          {!activeQuiz ? renderQuizList() : renderQuiz()}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;