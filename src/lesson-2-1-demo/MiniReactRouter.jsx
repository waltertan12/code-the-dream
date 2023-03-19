import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

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

const COMPANY_NAME = faker.company.name();

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

const About = () => (
  <div>
    <h1>About {COMPANY_NAME}</h1>
    <p>{faker.company.catchPhrase()}</p>
    <p>{faker.company.catchPhrase()}</p>
    <p>{faker.company.catchPhrase()}</p>
    <Link to="/lesson-2.1" component={Home}>
      Home
    </Link>
  </div>
);

const Contact = () => (
  <div>
    <h1>Contact {COMPANY_NAME}</h1>
    <p>Email: {faker.internet.exampleEmail()}</p>
    <Link to="/lesson-2.1" component={Home}>
      Home
    </Link>
  </div>
);
const Home = () => (
  <div>
    <h1>{COMPANY_NAME}</h1>
    <ul>
      <li>
        <Link to="/lesson-2.1/about" component={About}>
          About {COMPANY_NAME}
        </Link>
      </li>
      <li>
        <Link to="/lesson-2.1/contact" component={Contact}>
          Contact {COMPANY_NAME}
        </Link>
      </li>
    </ul>
  </div>
);

export const DemoApp = () => (
  <Router
    routes={[
      { path: "/lesson-2.1", component: Home },
      { path: "/lesson-2.1/about", component: About },
      { path: "/lesson-2.1/contact", component: Contact },
    ]}
  />
);
