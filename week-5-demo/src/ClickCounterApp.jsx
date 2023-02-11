import { useEffect, useState } from "react";

const ClickCounter = ({ clicks }) => {
  useEffect(() => {
    console.log({
      message: "Clicks updated",
      clicks,
      now: new Date().toISOString(),
    });
  }, [clicks]);

  return <div>Clicks: {clicks}</div>;
};

const ClickCounterApp = () => {
  useEffect(() => {
    console.log({
      messasge: "Running on mount",
      now: new Date().toISOString(),
    });
  }, []);
  useEffect(() => {
    return () =>
      console.log({
        messasge: "Running on un-mount",
        now: new Date().toISOString(),
      });
  }, []);
  useEffect(() => {
    console.log({
      message: "Running on all renders",
      now: new Date().toISOString(),
    });
  });
  const [clicks, setClicks] = useState(0);
  const handleClick = () => setClicks(clicks + 1);

  return (
    <div>
      <ClickCounter clicks={clicks} />
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default ClickCounterApp;
