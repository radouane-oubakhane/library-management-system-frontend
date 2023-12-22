import { Button, useToast } from "@chakra-ui/react";
import BookCard from "../components/BookCard";
import BookGrid from "../components/BookGrid";
import HeaderPage from "../components/HeaderPage";
import useBooks from "../hooks/book/useBooks";

function HomePage() {
  const { data: books, error, isLoading } = useBooks();


  return (
    <>
    <HeaderPage title="Books" ButtonComponent={Button} />
      <BookGrid books={books}  isLoading={isLoading} error={error} BookCardComponent={BookCard} />
    </>
  );
}

export default HomePage;
