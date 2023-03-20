import { useState, useEffect } from "react";

export const Router = ({ routes }) => {
  const [location, setLocation] = useState(window.location.pathname);
  useEffect(() => {
    const handlePopState = () => {
      setLocation(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const Component = routes.find((route) => route.path === location)?.component;
  if (!Component) {
    return <div>Error: Route not found 😭</div>;
  }

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
