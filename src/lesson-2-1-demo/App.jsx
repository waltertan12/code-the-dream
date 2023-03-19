import { useEffect, useState } from "react";
import HomeButton from "../HomeButton";
import { DemoApp } from "./MiniReactRouter";
const PAGES = {
  NOTES: "Notes",
  MINI_REACT_ROUTER: "Mini React Router",
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(PAGES.NOTES);
  useEffect(() => {
    document.title = `${currentPage} | Lesson 1.9 Demo`;
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
          href="https://capricious-dodo-22e.notion.site/2023-03-25-Lesson-2-1-990594609a664d9682b9ec176dfc16f2"
          target="_blank"
          rel="noreferrer"
        >
          Notes: Lesson 2.1
        </a>
      ) : null}
      {currentPage === PAGES.MINI_REACT_ROUTER ? <DemoApp /> : null}
    </div>
  );
};

export default App;
