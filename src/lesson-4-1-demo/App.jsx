import { useEffect, useState } from "react";
import HomeButton from "../HomeButton";
import AgeCalculator from "./AgeCalculator";
import NumberGuesser from "./NumberGuesser";
const PAGES = {
  NOTES: "Notes",
  AGE_CALCULATOR: "Age Calculator",
  NUMBER_GUESSER: "Number Guesser",
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
      {currentPage === PAGES.AGE_CALCULATOR ? <AgeCalculator /> : null}
      {currentPage === PAGES.NUMBER_GUESSER ? <NumberGuesser /> : null}
    </div>
  );
};

export default App;
