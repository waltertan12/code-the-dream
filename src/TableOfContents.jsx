import { useTitle } from "./hooks";

const TableOfContents = () => {
  useTitle("Code the Dream");
  return (
    <div>
      <h1>Code the Dream: Cockatoo</h1>
      <ul>
        <li>
          <a href="/pokefusion">Pokefusion</a>
        </li>
        <li>
          <a href="/lesson-1.5">Lesson 1.5</a>
        </li>
      </ul>
    </div>
  );
};

export default TableOfContents;
