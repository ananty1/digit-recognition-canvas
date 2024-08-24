import React, { useRef } from 'react';

const Canvas = ({ onDraw }) => {
  const canvasRef = useRef(null);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 15;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvas.addEventListener('mousemove', draw);
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    canvas.removeEventListener('mousemove', draw);
    onDraw(canvas);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      width={280}
      height={280}
      style={{ border: '1px solid black' }}
    />
  );
};

export default Canvas;
