import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import AuthorsPage from "./pages/AuthorsPage";
import BookDetailPage from "./pages/BookDetailPage";
import BooksPage from "./pages/BooksPage";
import BorrowsPage from "./pages/BorrowsPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import MembersPage from "./pages/MembersPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ReservationsPage from "./pages/ReservationsPage";
import InscriptionsPage from "./pages/inscriptionsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
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
        path: "books/",
        children: [
          { index: true, element: <BooksPage /> },
          { path: ":bookId", element: <BookDetailPage /> },
        ],
      },
      {
        path: "reservations/",
        children: [{ index: true, element: <ReservationsPage /> }],
      },
      {
        path: "borrows/",
        children: [{ index: true, element: <BorrowsPage /> }],
      },
      {
        path: "profile",
        children: [{ index: true, element: <ProfilePage/> }],
      }
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "inscriptions/",
        children: [{ index: true, element: <InscriptionsPage /> }],
      },
      {
        path: "members/",
        children: [{ index: true, element: <MembersPage /> }],
      },
    ],
  },
]);

export default router;
