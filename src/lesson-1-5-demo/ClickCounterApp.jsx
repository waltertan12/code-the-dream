import { useEffect, useState } from "react";

const ClickCounter = ({ clicks, alternateClicks }) => {
  useEffect(() => {
    console.log({
      message: "Clicks updated",
      clicks,
      now: new Date().toISOString(),
    });
  }, [clicks]); // only runs only when `clicks` changes

  return (
    <>
      <div>Clicks: {clicks}</div>
      <div>Alternate Clicks: {alternateClicks}</div>
    </>
  );
};

const ClickCounterApp = () => {
  useEffect(() => {
    console.log({
      message: "Running on mount",
      now: new Date().toISOString(),
    });
  }, []); //
  useEffect(() => {
    return () =>
      console.log({
        message: "Running on un-mount",
        now: new Date().toISOString(),
      });
  }, []); //
  useEffect(() => {
    console.log({
      message: "Running on all renders",
      now: new Date().toISOString(),
    });
  });
  const [clicks, setClicks] = useState(0);
  const [alternateClicks, setAlternateClicks] = useState(0);
  const handleClick = () => setClicks(clicks + 1);
  const handleAlternateClick = () => setAlternateClicks(alternateClicks + 1);

  return (
    <div>
      <ClickCounter clicks={clicks} alternateClicks={alternateClicks} />
      <button onClick={handleClick}>Click me</button>
      <button onClick={handleAlternateClick}>Alternate Click me</button>
    </div>
  );
};

export default ClickCounterApp;
