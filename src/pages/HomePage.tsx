import BookCard from "../components/BookCard";
import BookGrid from "../components/BookGrid";
import useBooks from "../hooks/book/useBooks";

function HomePage() {
  const { data: books, error, isLoading } = useBooks();
  return (
    <>
      <BookGrid books={books}  isLoading={isLoading} error={error} BookCardComponent={BookCard} />
    </>
  );
}

export default HomePage;
