import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "authors/",
        children: [{ path: ":authorId", element: <AuthorDetailPage /> }],
      },
      {
        path: "categories/",
        children: [{ path: ":categoryId", element: <CategoryDetailPage /> }],
      },
    ],
  },
]);

export default router;
