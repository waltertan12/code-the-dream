import { faker } from "@faker-js/faker";
import { createContext, Component } from "react";

export class HelloWorld extends Component {
  render() {
    return <p>Hello, World!</p>;
  }
}

export class Hello extends Component {
  render() {
    const { name } = this.props;
    return <p>Hello, {name}!</p>;
  }
}

export class Counter extends Component {
  // Aside: Notice how the constructor accepts props as the first argument
  constructor(props) {
    // Notice how we MUST call super(props)
    super(props);
    this.state = { count: 0 };
  }

  incrementCount() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button id="lmao" onClick={() => this.incrementCount()}>
          Increment
        </button>
      </div>
    );
  }
}

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
