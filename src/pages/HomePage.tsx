import { Divider } from "@chakra-ui/react";
import BookGrid from "../components/BookGrid";
import useBooks from "../hooks/useBooks";

function HomePage() {
  const { data: books, error, isLoading } = useBooks();
  return (
    <>
      <Divider orientation="horizontal" marginBottom={4} />
      <BookGrid books={books}  isLoading={isLoading} error={error}/>
    </>
  );
}

export default HomePage;
