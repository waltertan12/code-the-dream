import React from "react";
import { Link } from "react-router-dom";
import { useTitle } from "./hooks";

const TableOfContents = () => {
  useTitle("Code the Dream");
  return (
    <div>
      <h1>Code the Dream: Cockatoo</h1>
      <ul>
        <li>
          <Link to="/pokefusion">Pokefusion</Link>
        </li>
        <li>
          <Link to="/lesson-1.5">Lesson 1.5</Link>
        </li>
        <li>
          <Link to="/lesson-1.6">Lesson 1.6</Link>
        </li>
        <li>
          <Link to="/lesson-1.7">Lesson 1.7</Link>
        </li>
        <li>
          <Link to="/review-1.4-1.7">Review: Lesson 1.4 - Lesson 1.7</Link>
        </li>
        <li>
          <Link to="/lesson-1.8">Lesson 1.8</Link>
        </li>
        <li>
          <Link to="/lesson-1.9">Lesson 1.9</Link>
        </li>
        <li>
          <Link to="/lesson-2.1">Lesson 2.1</Link>
        </li>
        <li>
          <Link to="/lesson-3.1">Lesson 3.1</Link>
        </li>
        <li>
          <Link to="/lesson-4.1">Lesson 4.1</Link>
        </li>
        <li>
          <Link to="/lesson-5.1">Lesson 5.1</Link>
        </li>
      </ul>
    </div>
  );
};

export default TableOfContents;
