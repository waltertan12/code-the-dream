import { faker } from "@faker-js/faker";
import { act, render, fireEvent, screen } from "@testing-library/react";

import {
  HelloWorld,
  Hello,
  Counter,
  Lifecycle,
  HelloWithContext,
  NameContext,
} from "./ClassComponents";

describe("<HelloWorld />", () => {
  test("renders 'Hello, World!' text", () => {
    render(<HelloWorld />);
    const helloWorldElement = screen.getByText(/Hello, World!/i);
    expect(helloWorldElement).toBeInTheDocument();
  });
});

describe("<Hello />", () => {
  test("renders 'Hello, <name>!' text", () => {
    const name = faker.name.fullName();
    render(<Hello name={name} />);
    const helloElement = screen.getByText(`Hello, ${name}!`);
    expect(helloElement).toBeInTheDocument();
  });
});

describe("<Counter />", () => {
  test("renders initial count of 0", () => {
    render(<Counter />);
    const countElement = screen.getByText(/Count: 0/i);
    expect(countElement).toBeInTheDocument();
  });

  test("increments count when 'Increment' button is clicked", () => {
    render(<Counter />);
    const buttonElement = screen.getByText(/Increment/i);
    fireEvent.click(buttonElement);
    const countElement = screen.getByText(/Count: 1/i);
    expect(countElement).toBeInTheDocument();
  });
});

describe("<Lifecycle />", () => {
  test("renders component and updates elapsed time", () => {
    jest.useFakeTimers();
    const consoleLogSpy = jest.spyOn(console, "log");
    const fps = 24;
    const { container } = render(<Lifecycle fps={fps} />);
    expect(container).toHaveTextContent("0.000 seconds have passed");
    act(() => jest.advanceTimersByTime(1_000));
    expect(container).not.toHaveTextContent("0.000 seconds have passed");
    expect(container).toHaveTextContent("1.000 seconds have passed");
    expect(consoleLogSpy).toHaveBeenCalledWith({
      message: "[Lifecycle] Component updated",
      props: {
        fps,
      },
      state: expect.any(Object),
    });
  });

  test("cleans up interval on unmount", () => {
    jest.useFakeTimers();
    const fps = 24;
    const clearIntervalSpy = jest.spyOn(window, "clearInterval");
    const { unmount } = render(<Lifecycle fps={fps} />);
    act(() => unmount());
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });
});

describe("<HelloWithContext />", () => {
  test("renders with context", () => {
    const mockContextValue = { name: "John" };
    render(
      <NameContext.Provider value={mockContextValue}>
        <HelloWithContext />
      </NameContext.Provider>
    );
    expect(screen.getByText("Hello, John!")).toBeInTheDocument();
  });
});
