import AdminBookCard from "../components/AdminBookCard";
import BookGrid from "../components/BookGrid"
import HeaderPage from "../components/HeaderPage";
import useBooks from "../hooks/book/useBooks";

const BooksPage = () => {
  const { data: books, error, isLoading } = useBooks();
  return (
    <>
      <HeaderPage title="Books" button buttonTitle="Add New Book" />
      <BookGrid books={books}  isLoading={isLoading} error={error} BookCardComponent={AdminBookCard} />
    </>
  )
}

export default BooksPage