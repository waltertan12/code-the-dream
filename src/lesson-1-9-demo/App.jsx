import { useEffect, useState } from "react";
import HomeButton from "../HomeButton";
import ProductCatalog from "./ProductCatalog";
import SignupForm from "./SignupForm";
const PAGES = {
  NOTES: "Notes",
  ASNYC_AWAIT: "Async / Await: Product Catalog",
  SIGNUP_FORM: "Forms",
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(PAGES.NOTES);
  useEffect(() => {
    document.title = `${currentPage} | Lesson 1.9 Demo`;
  }, [currentPage]);
  return (
    <div>
      <HomeButton />
      <h1>Lesson 1.9: {currentPage}</h1>
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
          href="https://capricious-dodo-22e.notion.site/2023-03-08-Memoization-and-React-0a7cb627f4bb4aafa6928884b6670f15"
          target="_blank"
          rel="noreferrer"
        >
          Notes: Memoization and React
        </a>
      ) : null}
      {currentPage === PAGES.ASNYC_AWAIT ? <ProductCatalog /> : null}
      {currentPage === PAGES.SIGNUP_FORM ? <SignupForm /> : null}
    </div>
  );
};

export default App;
