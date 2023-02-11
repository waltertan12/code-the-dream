import { useState, useEffect } from "react";

const usePointerPosition = () => {
  // TODO: Implement pointer position
  return { x: 0, y: 0 };
};

const useDelayedPosition = (position, delay) => {
  // TODO: Implement delayed position
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

const MouseTrail = () => {
  const position = usePointerPosition();
  return (
    <>
      <Dot position={position} opacity={0.75} />
    </>
  );
};

export default MouseTrail;
