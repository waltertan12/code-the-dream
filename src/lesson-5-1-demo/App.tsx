import React, { useEffect, useState } from "react";
import HomeButton from "../HomeButton";
// import ClientSidePagination from "./ClientSidePagination";
import ServerSidePagination from "./ServerSidePagination";
import InfiniteScroll from "./InfiniteScroll";
import { UsersList, UsersListWithSorting } from "./DemoClientSidePagination";
import ArrayManipulation from "./ArrayManipulation";
const PAGES = {
  NOTES: "Notes",
  ARRAY_MANIPULATION: "Array Manipulation",
  CLIENT_SIDE_PAGINATION: "Simple Client Side Pagination",
  CLIENT_SIDE_PAGINATION_WITH_SORTING: "Client Side Pagination with Sorting",
  // CLIENT_SIDE_PAGINATION: "Client Side Pagination",
  SERVER_SIDE_PAGINATION: "Server Side Pagination",
  INFINITE_SCROLL: "Infinite Scroll",
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(PAGES.NOTES);
  useEffect(() => {
    document.title = `${currentPage} | Lesson 5.1 Demo`;
  }, [currentPage]);
  return (
    <div>
      <HomeButton />
      <h1>Lesson 5.1: {currentPage}</h1>
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
          href="https://capricious-dodo-22e.notion.site/Typescript-75469e4625c34a70b053fb22677f5571"
          target="_blank"
          rel="noreferrer"
        >
          Notes: Lesson 5.1
        </a>
      ) : null}
      {currentPage === PAGES.ARRAY_MANIPULATION ? <ArrayManipulation /> : null}
      {currentPage === PAGES.CLIENT_SIDE_PAGINATION ? <UsersList /> : null}
      {currentPage === PAGES.CLIENT_SIDE_PAGINATION_WITH_SORTING ? (
        <UsersListWithSorting />
      ) : null}
      {currentPage === PAGES.SERVER_SIDE_PAGINATION ? (
        <ServerSidePagination />
      ) : null}
      {currentPage === PAGES.INFINITE_SCROLL ? <InfiniteScroll /> : null}
    </div>
  );
};

export default App;
