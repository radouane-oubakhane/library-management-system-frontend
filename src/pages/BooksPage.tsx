import { useState } from "react";
import AddBookModal from "../components/AddBookMadel";
import AdminBookCard from "../components/AdminBookCard";
import BookGrid from "../components/BookGrid"
import HeaderPage from "../components/HeaderPage";
import useBooks from "../hooks/book/useBooks";

const BooksPage = () => {
  const { data: books, error, isLoading } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = searchTerm === ''
  ? books
  : books?.filter(book => book.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <HeaderPage title="Books" button ButtonComponent={AddBookModal} searching setSearchTerm={setSearchTerm} />
      <BookGrid books={filteredBooks}  isLoading={isLoading} error={error} BookCardComponent={AdminBookCard} />
    </>
  )
}

export default BooksPage