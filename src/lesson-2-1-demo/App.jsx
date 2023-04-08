import { useEffect, useState } from "react";
import HomeButton from "../HomeButton";
import SimpleRouterDemoApp from "./SimpleRouterDemoApp";
import { ClassComponentApp } from "./ClassComponents";
const PAGES = {
  NOTES: "Notes",
  SIMPLE_REACT_ROUTER: "Simple React Router",
  CLASS_COMPONENTS: "Class Components",
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(PAGES.NOTES);
  useEffect(() => {
    document.title = `${currentPage} | Lesson 2.1 Demo`;
  }, [currentPage]);
  return (
    <div>
      <HomeButton />
      <h1>Lesson 2.1: {currentPage}</h1>
      <ul className="table-of-contents">
        {Object.values(PAGES).map((page) => (
          <li key={page}>
            <a
              href="?"
              onClick={(event) => {
                event.preventDefault();
                console.log({ message: "Changing page", page });
                setCurrentPage(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
      {currentPage === PAGES.NOTES ? (
        <a
          href="https://capricious-dodo-22e.notion.site/2023-03-25-Lesson-2-1-665f2efd7eb240f5b2190f090ff145d4"
          target="_blank"
          rel="noreferrer"
        >
          Notes: Lesson 2.1
        </a>
      ) : null}
      {currentPage === PAGES.SIMPLE_REACT_ROUTER ? (
        <SimpleRouterDemoApp />
      ) : null}
      {currentPage === PAGES.CLASS_COMPONENTS ? <ClassComponentApp /> : null}
    </div>
  );
};

export default App;
