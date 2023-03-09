import { memo, useCallback, useMemo, useState } from "react";

const DoubleCounter = () => {
  const [aIncrement, setAIncrement] = useState(1);
  const [bIncrement, setBIncrement] = useState(1);
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  const incrementCountA = () => setCountA(countA + aIncrement);
  const incrementCountB = () => setCountB(countB + bIncrement);
  const handleAIncrement = (event) => setAIncrement(Number(event.target.value));
  const handleBIncrement = (event) => setBIncrement(Number(event.target.value));

  // Better
  // const incrementCountA = useCallback(() => {
  //   setCountA(countA + 1);
  // }, [countA]);

  // const incrementCountB = useCallback(() => {
  //   setCountB(countB + 1);
  // }, [countB]);

  // Best
  // const incrementCountA = useCallback(() => {
  //   setCountA((a) => a + 1);
  // }, []);

  // const incrementCountB = useCallback(() => {
  //   setCountB((b) => b + 1);
  // }, []);

  return (
    <div>
      <div>
        <h1>Multiply</h1>
        <p>Count A: {countA}</p>
        <Button onClick={incrementCountA} label="Increment A" />
        <input
          type="number"
          min="1"
          value={aIncrement}
          onChange={handleAIncrement}
        />
        <p>Count B: {countB}</p>
        <Button onClick={incrementCountB} label="Increment B" />
        <input
          type="number"
          min="1"
          value={bIncrement}
          onChange={handleBIncrement}
        />
        <Multiplication a={countA} b={countB} />
      </div>
    </div>
  );
};

const Button = memo(({ onClick, label }) => {
  console.log({ message: `Rendering <Button />`, label });
  return <button onClick={onClick}>{label}</button>;
});

const Multiplication = ({ a, b }) => {
  const multiply = (a, b) => {
    const start = performance.now();
    let product = 0;
    for (let i = 0; i < Math.abs(a); i += 1) {
      for (let j = 0; j < Math.abs(b); j += 1) {
        product += 1;
      }
    }

    console.log({
      message: "finished multiplying",
      timing: performance.now() - start,
    });

    return product;
  };

  return (
    <div>
      {Math.abs(a)} times {Math.abs(b)} is {multiply(a, b)}
    </div>
  );
};

export default DoubleCounter;
