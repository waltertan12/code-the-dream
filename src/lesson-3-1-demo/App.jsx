import { useEffect, useState } from "react";
import HomeButton from "../HomeButton";
import RebassApp from "./RebassApp";
import StyledComponentApp from "./StyledComponentApp";
import StyledSystemApp from "./StyledSystemApp";
const PAGES = {
  NOTES: "Notes",
  STYLED_COMPONENTS: "Styled Components",
  STYLED_SYSTEM: "Styled System",
  REBASS: "Rebass",
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(PAGES.NOTES);
  useEffect(() => {
    document.title = `${currentPage} | Lesson 3.1 Demo`;
  }, [currentPage]);
  return (
    <div>
      <HomeButton />
      <h1>Lesson 3.1: {currentPage}</h1>
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
          href="https://capricious-dodo-22e.notion.site/2023-04-01-Design-Systems-6750eeda4afb44df9eb79bbfe934cc62"
          target="_blank"
          rel="noreferrer"
        >
          Notes: Lesson 3.1
        </a>
      ) : null}
      {currentPage === PAGES.STYLED_SYSTEM ? <StyledSystemApp /> : null}
      {currentPage === PAGES.STYLED_COMPONENTS ? <StyledComponentApp /> : null}
      {currentPage === PAGES.REBASS ? <RebassApp /> : null}
    </div>
  );
};

export default App;
