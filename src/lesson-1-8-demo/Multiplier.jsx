import { memo, useCallback, useMemo, useState } from "react";

const Multiply = () => {
  const [aIncrement, setAIncrement] = useState(1);
  const [bIncrement, setBIncrement] = useState(1);
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  const incrementCountA = useCallback(() => {
    setCountA((a) => a + aIncrement);
  }, [aIncrement]);
  const incrementCountB = useCallback(() => {
    setCountB((b) => b + bIncrement);
  }, [bIncrement]);
  const handleAIncrement = (event) => setAIncrement(Number(event.target.value));
  const handleBIncrement = (event) => setBIncrement(Number(event.target.value));

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
export default Multiply;

const Button = memo(({ onClick, label }) => {
  console.log({ message: `Rendering <Button />`, label });
  return <button onClick={onClick}>{label}</button>;
});

const Multiplication = ({ a, b }) => {
  const product = useMemo(() => {
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
  }, [a, b]);

  return (
    <div>
      {Math.abs(a)} times {Math.abs(b)} is {product}
    </div>
  );
};

const ChildComponent = memo(() => {
  console.log("ChildComponent rendered");
  return <div>Child Component</div>;
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  console.log("ParentComponent rendered");
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent />
    </div>
  );
};

const App = () => {
  console.log("App rendered");
  return <ParentComponent />;
};
