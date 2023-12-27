import { Button } from "@chakra-ui/react";
import BookCard from "../components/BookCard";
import BookGrid from "../components/BookGrid";
import HeaderPage from "../components/HeaderPage";
import useBooks from "../hooks/book/useBooks";
import DiscoveryHeader from "../components/DiscoveryHeader";
import { useState } from "react";
import useAuth from "../hooks/auth/useAuth";
import AdminDashboard from "../components/AdminDashboard";

function HomePage() {
  const { data: books, error, isLoading } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const {user} = useAuth();


  const filteredBooks = searchTerm === ''
  ? books
  : books?.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  book.author_first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  book.author_last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  book.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (user?.is_admin) {
    return <AdminDashboard />
  }


  return (
    <>
    <DiscoveryHeader setSearchTerm={setSearchTerm} />
    <HeaderPage title="Books" ButtonComponent={Button} />
      <BookGrid books={filteredBooks}  isLoading={isLoading} error={error} BookCardComponent={BookCard} />
    </>
  );
}

export default HomePage;
