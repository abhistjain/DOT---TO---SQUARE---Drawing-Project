import React from "react";

const Canvas = ({ squares, currentDots, onClick, squareComplete }) => {
  const lines = [];

  // Completed squares
  squares.forEach(({ dots, color }) => {
    for (let i = 0; i < 4; i++) {
      lines.push({
        from: dots[i],
        to: dots[(i + 1) % 4],
        color: color
      });
    }
  });

  // Ongoing lines from current dots
  for (let i = 0; i < currentDots.length - 1; i++) {
    lines.push({
      from: currentDots[i],
      to: currentDots[i + 1],
      color: 'black'
    });
  }

  return (
    <svg className={`canvas ${squareComplete ? 'complete' : ''}`} onClick={onClick}>
      {lines.map((line, idx) => (
        <line
          key={idx}
          x1={line.from.x}
          y1={line.from.y}
          x2={line.to.x}
          y2={line.to.y}
          stroke={line.color || 'black'}
          strokeWidth="2"
        />
      ))}
      {squares.flatMap(({ dots }, sIdx) =>
        dots.map((dot, dIdx) => (
          <circle key={`s-${sIdx}-${dIdx}`} cx={dot.x} cy={dot.y} r="5" fill="red" />
        ))
      )}
      {currentDots.map((dot, idx) => (
        <circle key={`c-${idx}`} cx={dot.x} cy={dot.y} r="5" fill="red" />
      ))}
    </svg>
  );
};

export default Canvas;
