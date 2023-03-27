import { faker } from "@faker-js/faker";
import {
  createContext,
  Component,
  useContext,
  useState,
  useEffect,
} from "react";

export const HelloWorld = () => <p>Hello, World!</p>;

export const Hello = ({ name }) => <p>Hello, {name}!</p>;

export const Counter = () => {
  const [count, setCount] = useState(0);
  const incrementCount = () => setCount(count + 1);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
};

export const Timer = ({ fps }) => {
  const [timerInterval, setTimerInterval] = useState(null);
  const [start] = useState(performance.now());
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    console.log({ message: "[Timer] Component mounted" });
    setTimerInterval(
      setInterval(() => setElapsed(performance.now() - start), 1_000 / fps)
    );
    return () => {
      console.log({ message: "[Timer] Component unmounting" });
      clearInterval(timerInterval);
      setTimerInterval(null);
    };
  }, []);
  useEffect(() => {
    console.log({
      message: "[Timer] Component updated",
      state: { elapsed, timerInterval, start },
      props: { fps },
    });
  });
  return (
    <div>
      <code>{(elapsed / 1_000).toFixed(3)}</code> seconds have passed
    </div>
  );
};

export const NameContext = createContext({ name: "World" });

export const HelloWithContext = () => {
  const context = useContext(NameContext);
  return <p>Hello, {context.name}!</p>;
};

export class ClassComponentApp extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>{"<HelloWorld />"}</h2>
          <HelloWorld />
        </div>
        <div>
          <h2>{"<Hello />"}</h2>
          <Hello name={faker.name.firstName()} />
        </div>
        <div>
          <h2>{"<Counter />"}</h2>
          <Counter />
        </div>
        <div>
          <h2>{"<Timer />"}</h2>
          <Timer fps={24} />
        </div>
        <div>
          <h2>{"<HelloContext />"}</h2>
          <NameContext.Provider value={{ name: faker.name.firstName() }}>
            <HelloWithContext />
          </NameContext.Provider>
        </div>
      </div>
    );
  }
}
