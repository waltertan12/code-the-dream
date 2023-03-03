import { useEffect, useState } from "react";
import DinnerParty from "./DinnerParty";
import HomeButton from "../HomeButton";
const PAGES = {
  ASYNC_REQUESTS: "Async Requests",
  DINNER_PARTY: "Am I going to the Dinner Party?",
};

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.ASYNC_REQUESTS);
  useEffect(() => {
    document.title = `Lesson 1.7 Demo - ${currentPage}`;
  }, [currentPage]);
  return (
    <div className="app">
      <HomeButton />
      <h1>Lesson 1.7: {currentPage}</h1>
      <ul className="table-of-contents">
        {Object.values(PAGES).map((page) => (
          <li key={page}>
            <a
              href=""
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
      <div>
        {currentPage === PAGES.ASYNC_REQUESTS ? (
          <a
            href="https://capricious-dodo-22e.notion.site/2023-02-25-v1-91b12ca458184f66a809268988396c60"
            target="_blank"
            rel="noreferrer"
          >
            NOTES - Async Requests
          </a>
        ) : null}
      </div>
      <div>{currentPage === PAGES.DINNER_PARTY ? <DinnerParty /> : null}</div>
    </div>
  );
}

export default App;
