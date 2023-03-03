import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TableOfContents from "./TableOfContents";
import OneFive from "./lesson-1-5-demo/App";
import OneSix from "./lesson-1-6-demo/App";
import OneSeven from "./lesson-1-7-demo/App";
import Pokefusion from "./pokefusion/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <TableOfContents />,
  },
  {
    path: "/pokefusion",
    element: <Pokefusion />,
  },
  {
    path: "/lesson-1.5",
    element: <OneFive />,
  },
  {
    path: "/lesson-1.6",
    element: <OneSix />,
  },
  {
    path: "/lesson-1.7",
    element: <OneSeven />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
