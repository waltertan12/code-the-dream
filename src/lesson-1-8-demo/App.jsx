import { useEffect, useState } from "react";
import HomeButton from "../HomeButton";
import ProductApp from "./ProductCatalog/ProductApp";
import Multiplier from "./Multiplier";
const PAGES = {
  NOTES: "Notes",
  MULTIPLIER: "Multipler",
  PRODUCT_CATALOG: "Product Catalog",
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(PAGES.NOTES);
  useEffect(() => {
    document.title = `${currentPage} | Lesson 1.8 Demo`;
  }, [currentPage]);
  return (
    <div>
      <HomeButton />
      <h1>Lesson 1.8: {currentPage}</h1>
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
      {currentPage === PAGES.PRODUCT_CATALOG ? <ProductApp /> : null}
      {currentPage === PAGES.MULTIPLIER ? <Multiplier /> : null}
    </div>
  );
};

export default App;
