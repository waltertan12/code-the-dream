import Confetti from "react-dom-confetti";
import { useEffect, useState } from "react";

const confettiConfig = {
  angle: 31,
  spread: 360,
  startVelocity: 30,
  elementCount: 301,
  dragFriction: 0.05,
  duration: 4000,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#78FF44", "#FF718d", "#FDFF6A", "#F46A35", "#365090"],
};

const ConfettiEffect = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setShowConfetti(true), 1_000);
    return () => clearTimeout(timeout);
  }, []);

  return <Confetti active={showConfetti} config={confettiConfig} />;
};

export default ConfettiEffect;
