import AuthorGrid from "../components/AuthorGrid";
import HeaderPage from "../components/HeaderPage";
import useAuthors from "../hooks/author/useAuthors";

const AuthorsPage = () => {
  const { data: authors, error, isLoading } = useAuthors();
  return (
    <>
      <HeaderPage title="Authors" button buttonTitle="Add New Author" />
      <AuthorGrid authors={authors} isLoading={isLoading} error={error} />
    </>
  )
}

export default AuthorsPage










