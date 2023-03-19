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
          href="https://capricious-dodo-22e.notion.site/2023-03-19-2cdc3c62e21b4cc6a511d98e3581e236"
          target="_blank"
          rel="noreferrer"
        >
          Notes: Lesson 1.9
        </a>
      ) : null}
      {currentPage === PAGES.ASNYC_AWAIT ? <ProductCatalog /> : null}
      {currentPage === PAGES.SIGNUP_FORM ? <SignupForm /> : null}
    </div>
  );
};

export default App;
