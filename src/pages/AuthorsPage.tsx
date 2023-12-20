import AddAuthorModal from "../components/AddAuthorMadel";
import AuthorGrid from "../components/AuthorGrid";
import HeaderPage from "../components/HeaderPage";
import useAuthors from "../hooks/author/useAuthors";

const AuthorsPage = () => {
  const { data: authors, error, isLoading } = useAuthors();
  return (
    <>
      <HeaderPage title="Authors" button ButtonComponent={AddAuthorModal} />
      <AuthorGrid authors={authors} isLoading={isLoading} error={error} />
    </>
  )
}

export default AuthorsPage










