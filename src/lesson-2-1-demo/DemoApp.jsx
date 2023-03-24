import { faker } from "@faker-js/faker";
import { Link, Router } from "./MiniReactRouter";

const COMPANY_NAME = faker.company.name();
const About = () => (
  <div>
    <h1>About {COMPANY_NAME}</h1>
    <p>{faker.company.catchPhrase()}</p>
    <p>{faker.company.catchPhrase()}</p>
    <p>{faker.company.catchPhrase()}</p>
    <Link to="/lesson-2.1" component={Home}>
      &lt; Home
    </Link>
  </div>
);

const Contact = () => (
  <div>
    <h1>Contact {COMPANY_NAME}</h1>
    <p>Email: {faker.internet.exampleEmail()}</p>
    <Link to="/lesson-2.1" component={Home}>
      &lt; Home
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
      <li>
        <Link to="/lesson-2.1/not-found" component={Contact}>
          Not Found
        </Link>
      </li>
    </ul>
  </div>
);

const DemoApp = () => (
  <Router
    routes={[
      { path: "/lesson-2.1", component: Home },
      { path: "/lesson-2.1/about", component: About },
      { path: "/lesson-2.1/contact", component: Contact },
    ]}
  />
);

export default DemoApp;
