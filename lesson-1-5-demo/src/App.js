import ClickCounterApp from "./ClickCounterApp";
import FragmentDemo from "./FragmentDemo";
import NumberGuesser from "./NumberGuesser";
import Purity from "./Purity";
import OnlineOffline from "./OnlineOffline";
import ConfettiEffect from "./ConfettiEffect";
import MouseTrail from "./MouseTrail";
import { useEffect, useState } from "react";

const PAGES = {
  FRAGMENTS: "Fragments",
  EFFECTS_PREREQ_PURITY: "Effects - Prereq - Purity",
  EFFECTS_PREREQ_EVENT_HANDLERS: "Effects - Prereq - Event Handlers",
  EFFECTS_CLICK_COUNTER: "Effects - Click Counter",
  EFFECTS_CONFETTI: "Effects - Confetti",
  EFFECTS_ONLINE_OFFLINE: "Effects - Online / Offline",
  EFFECTS_MOUSE_TRAIL: "Effects - Mouse Trail",
};

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.FRAGMENTS);
  useEffect(() => {
    document.title = `Lesson 1.5 Demo - ${currentPage}`;
  }, [currentPage]);

  return (
    <div>
      <h1>{currentPage}</h1>
      <ul>
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
        {currentPage === PAGES.FRAGMENTS ? <FragmentDemo /> : null}
        {currentPage === PAGES.EFFECTS_PREREQ_EVENT_HANDLERS ? (
          <NumberGuesser />
        ) : null}
        {currentPage === PAGES.EFFECTS_PREREQ_PURITY ? <Purity /> : null}
        {currentPage === PAGES.EFFECTS_CLICK_COUNTER ? (
          <ClickCounterApp />
        ) : null}
        {currentPage === PAGES.EFFECTS_CONFETTI ? <ConfettiEffect /> : null}
        {currentPage === PAGES.EFFECTS_ONLINE_OFFLINE ? (
          <OnlineOffline />
        ) : null}
        {currentPage === PAGES.EFFECTS_MOUSE_TRAIL ? <MouseTrail /> : null}
      </ul>
    </div>
  );
}

export default App;
