import { useState } from "react";
import AddAuthorModal from "../components/AddAuthorMadel";
import AuthorGrid from "../components/AuthorGrid";
import HeaderPage from "../components/HeaderPage";
import useAuthors from "../hooks/author/useAuthors";

const AuthorsPage = () => {
  const { data: authors, error, isLoading } = useAuthors();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAuthors =
    searchTerm === ""
      ? authors
      : authors?.filter(
          (author) =>
            author.first_name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            author.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <>
      <HeaderPage
        title="Authors"
        button
        ButtonComponent={AddAuthorModal}
        searching
        setSearchTerm={setSearchTerm}
      />
      <AuthorGrid
        authors={filteredAuthors}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default AuthorsPage;
