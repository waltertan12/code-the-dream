import { useEffect, useState } from "react";
import CollapsibleContainerApp from "./CollapsibleContainer";
import ModalApp from "./Modal";
import ImperativeVsDeclarative from "./ImperativeVsDeclarative";
import DuplicatingTodos from "./DuplicatingTodos";
import HomeButton from "../HomeButton";
import "./index.css";
const PAGES = {
  IMPERATIVE_VS_DECLARATIVE: "Imperative vs Declarative",
  COLLAPSIBLE_CONTAINER: "Collapsible Container",
  MODAL: "Modal",
  DUPLICATING_TODOS: "Duplicating Todos",
};

function App() {
  const [currentPage, setCurrentPage] = useState(
    PAGES.IMPERATIVE_VS_DECLARATIVE
  );
  useEffect(() => {
    document.title = `${currentPage} | Lesson 1.6 Demo`;
  }, [currentPage]);
  return (
    <div className="lesson16-app">
      <HomeButton />
      <h1>{currentPage}</h1>
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
        {currentPage === PAGES.IMPERATIVE_VS_DECLARATIVE ? (
          <ImperativeVsDeclarative />
        ) : null}
        {currentPage === PAGES.COLLAPSIBLE_CONTAINER ? (
          <CollapsibleContainerApp />
        ) : null}
        {currentPage === PAGES.MODAL ? <ModalApp /> : null}
        {currentPage === PAGES.DUPLICATING_TODOS ? <DuplicatingTodos /> : null}
      </div>
    </div>
  );
}

export default App;
