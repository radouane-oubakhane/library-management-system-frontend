import AdminBookCard from "../components/AdminBookCard";
import BookGrid from "../components/BookGrid"
import useBooks from "../hooks/useBooks";

const BooksPage = () => {
  const { data: books, error, isLoading } = useBooks();
  return (
    <>
      <BookGrid books={books}  isLoading={isLoading} error={error} BookCardComponent={AdminBookCard} />
    </>
  )
}

export default BooksPage