import { faker } from "@faker-js/faker";
import { SimpleLink, SimpleRouter } from "./SimpleRouter";

const COMPANY_NAME = faker.company.name();
const About = () => (
  <div>
    <h1>About {COMPANY_NAME}</h1>
    <p>{faker.company.catchPhrase()}</p>
    <p>{faker.company.catchPhrase()}</p>
    <p>{faker.company.catchPhrase()}</p>
  </div>
);

const Contact = () => (
  <div>
    <h2>Contact {COMPANY_NAME}</h2>
    <p>Email: {faker.internet.exampleEmail()}</p>
  </div>
);
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);
const Careers = () => (
  <div>
    <h2>Careers</h2>
  </div>
);

const SimpleRouterDemoApp = () => (
  <div>
    <h1>{COMPANY_NAME}</h1>
    <ul>
      <li>
        <SimpleLink to="/lesson-2.1/about" component={About}>
          About {COMPANY_NAME}
        </SimpleLink>
      </li>
      <li>
        <SimpleLink to="/lesson-2.1/contact" component={Contact}>
          Contact {COMPANY_NAME}
        </SimpleLink>
      </li>
      <li>
        {/* NOTE: The careers endpoint is not registered to the router */}
        <SimpleLink to="/lesson-2.1/careers" component={Careers}>
          Careers
        </SimpleLink>
      </li>
    </ul>
    <SimpleRouter
      routes={[
        { path: "/lesson-2.1", component: Home },
        { path: "/lesson-2.1/about", component: About },
        { path: "/lesson-2.1/contact", component: Contact },
      ]}
    />
  </div>
);

export default SimpleRouterDemoApp;
