import { useState, useEffect } from "react";

const usePointerPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return position;
};

const useDelayedPosition = (position, delay) => {
  const [delayedPosition, setDelayedPosition] = useState(position);

  useEffect(() => {
    setTimeout(() => {
      setDelayedPosition(position);
    }, delay);
  }, [position, delay]);

  return delayedPosition;
};

const Dot = ({ position, opacity }) => {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#03a5fc",
        borderRadius: "50%",
        opacity,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: "none",
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }}
    />
  );
};

const MouseTrail = ({ delay = 75 }) => {
  const position1 = usePointerPosition();
  const position2 = useDelayedPosition(position1, delay);
  const position3 = useDelayedPosition(position2, delay);
  const position4 = useDelayedPosition(position3, delay);
  const position5 = useDelayedPosition(position4, delay);
  const position6 = useDelayedPosition(position5, delay);
  const position7 = useDelayedPosition(position6, delay);
  const position8 = useDelayedPosition(position7, delay);
  const position9 = useDelayedPosition(position8, delay * 0.95);
  const position10 = useDelayedPosition(position9, delay * 0.85);
  const position11 = useDelayedPosition(position10, delay * 0.75);
  const position12 = useDelayedPosition(position11, delay * 0.65);

  return (
    <>
      <Dot position={position1} opacity={0.75} />
      <Dot position={position2} opacity={0.7} />
      <Dot position={position3} opacity={0.65} />
      <Dot position={position4} opacity={0.6} />
      <Dot position={position5} opacity={0.55} />
      <Dot position={position6} opacity={0.5} />
      <Dot position={position7} opacity={0.45} />
      <Dot position={position8} opacity={0.4} />
      <Dot position={position9} opacity={0.35} />
      <Dot position={position10} opacity={0.3} />
      <Dot position={position11} opacity={0.25} />
      <Dot position={position12} opacity={0.2} />
    </>
  );
};

export default MouseTrail;
