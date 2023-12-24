import { useState } from "react";
import AddBookModal from "../components/AddBookMadel";
import AdminBookCard from "../components/AdminBookCard";
import BookGrid from "../components/BookGrid"
import HeaderPage from "../components/HeaderPage";
import useBooks from "../hooks/book/useBooks";
import useAuth from "../hooks/auth/useAuth";
import { Button } from "@chakra-ui/react";
import BookCard from "../components/BookCard";

const BooksPage = () => {
  const { data: books, error, isLoading } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const {user} = useAuth();

  const filteredBooks = searchTerm === ''
  ? books
  : books?.filter(book => book.title?.toLowerCase().includes(searchTerm.toLowerCase()));


  if (user?.is_admin) {return (
    <>
      <HeaderPage title="Books" button ButtonComponent={AddBookModal} searching setSearchTerm={setSearchTerm} />
      <BookGrid books={filteredBooks}  isLoading={isLoading} error={error} BookCardComponent={AdminBookCard} />
    </>
  )} else return (
    <>
      <HeaderPage title="Books" ButtonComponent={Button} searching setSearchTerm={setSearchTerm} />
      <BookGrid books={filteredBooks}  isLoading={isLoading} error={error} BookCardComponent={BookCard} />
    </>
  )
}

export default BooksPage