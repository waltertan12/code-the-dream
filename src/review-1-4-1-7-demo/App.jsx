import React, { useState, useEffect } from "react";
import "./index.css";
import Blog from "./Blog";

const PAGES = {
  NOTES: "Notes",
  BLOG: "Blog",
};

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.NOTES);
  useEffect(() => {
    document.title = `${currentPage} | Review 1.4 - 1.7`;
  }, [currentPage]);
  return (
    <div className="app">
      <h1>Review Lesson 1.4 - 1.7: {currentPage}</h1>
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
        {currentPage === PAGES.NOTES ? (
          <a
            href="https://capricious-dodo-22e.notion.site/2023-03-04-Review-788683bd646d4349b0eaf926e8ea4dd6"
            target="_blank"
            rel="noreferrer"
          >
            NOTES
          </a>
        ) : null}
      </div>
      <div>{currentPage === PAGES.BLOG ? <Blog /> : null}</div>
    </div>
  );
}

export default App;
