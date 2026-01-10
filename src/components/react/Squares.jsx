import { useRef, useEffect, useState } from "react";

export default function Squares({
  direction = "diagonal",
  speed = 0.5,
  borderColor = "#333",
  hoverFillColor = "#222",
}) {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef(0);
  const numSquaresY = useRef(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const [hoveredSquare, setHoveredSquare] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / 40) + 1;
      numSquaresY.current = Math.ceil(canvas.height / 40) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const startX = Math.floor(gridOffset.current.x / 40);
      const startY = Math.floor(gridOffset.current.y / 40);

      for (let x = startX; x < startX + numSquaresX.current; x++) {
        for (let y = startY; y < startY + numSquaresY.current; y++) {
          const squareX = x * 40 - gridOffset.current.x;
          const squareY = y * 40 - gridOffset.current.y;

          if (hoveredSquare && hoveredSquare.x === x && hoveredSquare.y === y) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, 40, 40);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, 40, 40);
        }
      }

      const moveAmt = speed;
      if (direction === "right")
        gridOffset.current.x = (gridOffset.current.x - moveAmt) % 40;
      else if (direction === "left")
        gridOffset.current.x = (gridOffset.current.x + moveAmt) % 40;
      else if (direction === "down")
        gridOffset.current.y = (gridOffset.current.y - moveAmt) % 40;
      else if (direction === "up")
        gridOffset.current.y = (gridOffset.current.y + moveAmt) % 40;
      else if (direction === "diagonal") {
        gridOffset.current.x = (gridOffset.current.x - moveAmt) % 40;
        gridOffset.current.y = (gridOffset.current.y - moveAmt) % 40;
      }

      requestRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(requestRef.current);
    };
  }, [direction, speed, borderColor, hoverFillColor, hoveredSquare]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const gridX = Math.floor((x + gridOffset.current.x) / 40);
    const gridY = Math.floor((y + gridOffset.current.y) / 40);
    setHoveredSquare({ x: gridX, y: gridY });
  };

  const handleMouseLeave = () => setHoveredSquare(null);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        display: "block",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
