import Root from "@/Layouts/Root";
import About from "@/Pages/About/About";
import Contact from "@/Pages/Contact/Contact";
import ErrorPage from "@/Pages/Error/ErrorPage";
import Home from "@/Pages/Home/Home";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
    ],
  },
]);

export default router;
