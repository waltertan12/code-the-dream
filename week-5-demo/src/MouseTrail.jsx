import { useState, useEffect } from "react";

const usePointerPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handlePointerMove = (event) =>
      setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return position;
};

const useDelayedPosition = (position, delay) => {
  const [delayedPosition, setDelayedPosition] = useState(position);
  useEffect(() => {
    setTimeout(() => setDelayedPosition(position), delay);
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

const MouseTrail = ({ delay = 100 }) => {
  const pos1 = usePointerPosition();
  // const pos2 = useDelayedPosition(pos1, delay);
  // const pos3 = useDelayedPosition(pos2, delay);
  // const pos4 = useDelayedPosition(pos3, delay);
  // const pos5 = useDelayedPosition(pos4, delay);
  // const pos6 = useDelayedPosition(pos5, delay);
  // const pos7 = useDelayedPosition(pos6, delay);
  // const pos8 = useDelayedPosition(pos6, delay);
  // const pos9 = useDelayedPosition(pos6, delay);

  return (
    <>
      <Dot position={pos1} opacity={0.75} />
      {/* <Dot position={pos2} opacity={0.65} />
      <Dot position={pos3} opacity={0.55} />
      <Dot position={pos4} opacity={0.45} />
      <Dot position={pos5} opacity={0.35} />
      <Dot position={pos6} opacity={0.25} />
      <Dot position={pos7} opacity={0.15} />
      <Dot position={pos8} opacity={0.1} />
      <Dot position={pos9} opacity={0.05} /> */}
    </>
  );
};

export default MouseTrail;
