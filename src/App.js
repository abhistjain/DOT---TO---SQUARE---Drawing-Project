import './App.css';
import React, { useState } from 'react';
import Canvas from './Components/Canvas';

function App() {
  const [squares, setSquares] = useState([]); // Array of square objects
  const [currentDots, setCurrentDots] = useState([]);
  const [squareComplete, setSquareComplete] = useState(false);

  const gridSize = 20;
  const snapToGrid = (value) => Math.round(value / gridSize) * gridSize;

  const colors = ['red', 'blue', 'green', 'orange', 'purple', 'teal'];
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const handleCanvasClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const newDot = {
      x: snapToGrid(e.clientX - rect.left),
      y: snapToGrid(e.clientY - rect.top)
    };

    const updatedDots = [...currentDots, newDot];

    if (updatedDots.length === 4) {
      setSquares([...squares, { dots: updatedDots, color: getRandomColor() }]);
      setCurrentDots([]);
      setSquareComplete(true);
      setTimeout(() => setSquareComplete(false), 1000);
    } else {
      setCurrentDots(updatedDots);
    }
  };

  const handleReset = () => {
    setSquares([]);
    setCurrentDots([]);
    setSquareComplete(false);
  };

  const handleUndo = () => {
    if (currentDots.length > 0) {
      setCurrentDots(currentDots.slice(0, -1));
    } else if (squares.length > 0) {
      const newSquares = [...squares];
      newSquares.pop();
      setSquares(newSquares);
    }
  };

  return (
    <div className="App">
      <h2>DOT - TO - SQUARE Drawing App</h2>
      <Canvas
        squares={squares}
        currentDots={currentDots}
        onClick={handleCanvasClick}
        squareComplete={squareComplete}
      />
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button className="reset-btn" onClick={handleReset}>Reset</button>
        <button className="reset-btn" onClick={handleUndo}>Undo</button>
      </div>
    </div>
  );
}

export default App;
