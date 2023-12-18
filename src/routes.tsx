import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import InscriptionsPage from "./pages/inscriptionsPage";
import CategoriesPage from "./pages/CategoriesPage";
import BooksPage from "./pages/BooksPage";
import AuthorsPage from "./pages/AuthorsPage";
import MembersPage from "./pages/MembersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "authors/",
        children: [
          { index: true, element: <AuthorsPage /> },
          { path: ":authorId", element: <AuthorDetailPage /> },
        ],
      },
      {
        path: "categories/",
        children: [
          { index: true, element: <CategoriesPage /> },
          { path: ":categoryId", element: <CategoryDetailPage /> },
        ],
      },
      {
        path: "inscriptions/",
        children: [{ index: true, element: <InscriptionsPage /> }],
      },
      {
        path: "books/",
        children: [
          { index: true, element: <BooksPage /> },
          { path: ":bookId", element: <AuthorDetailPage /> },
        ],
      },
      {
        path: "members/",
        children: [{ index: true, element: <MembersPage /> }],
      },
    ],
  },
]);

export default router;
