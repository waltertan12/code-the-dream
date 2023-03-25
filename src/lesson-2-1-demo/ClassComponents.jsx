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

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { interval: null, start: performance.now(), elapsed: 0 };
  }

  componentDidMount() {
    console.log({ message: "[Timer] Component mounted" });
    this.setState({
      ...this.state,
      interval: setInterval(
        () =>
          this.setState((state) => ({
            ...state,
            elapsed: performance.now() - state.start,
          })),
        1_000 / this.props.fps || 24
      ),
    });
  }

  componentDidUpdate() {
    console.log({
      message: "[Timer] Component updated",
      state: this.state,
      props: this.props,
    });
  }

  componentWillUnmount() {
    console.log({ message: "[Timer] Component unmounting" });
    clearInterval(this.state.interval);
    this.setState({ interval: null });
  }

  render() {
    return (
      <div>
        <code>{(this.state.elapsed / 1_000).toFixed(3)}</code> seconds have
        passed
      </div>
    );
  }
}

export const NameContext = createContext({ name: "World" });

export class HelloWithContext extends Component {
  static contextType = NameContext;
  render() {
    return <p>Hello, {this.context.name}!</p>;
  }
}

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
