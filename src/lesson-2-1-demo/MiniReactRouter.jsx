import { useState, useEffect } from "react";

export const Router = ({ routes }) => {
  const [location, setLocation] = useState(window.location.pathname);
  useEffect(() => {
    const handlePopState = (event) => {
      console.log({
        message: "[Router] Handling PopStateEvent",
        event,
        previousLocation: location,
        nextLocation: window.location.pathname,
      });
      setLocation(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Component = routes.find((route) => route.path === location)?.component;
  if (!Component) {
    console.error({
      message: "[Router] Unable to find Component",
      path: location,
    });
    return (
      <div>
        <strong>🚨 Error 🚨</strong>
        <p>
          Route <code>{location}</code> not found
        </p>
      </div>
    );
  }

  console.log({ message: "[Router] Found Component", path: location });
  return <Component />;
};

export const Link = ({ to, children }) => {
  const handleClick = (event) => {
    event.preventDefault();
    window.history.pushState(null, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};
