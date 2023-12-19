import AuthorGrid from "../components/AuthorGrid";
import useAuthors from "../hooks/author/useAuthors";

const AuthorsPage = () => {
  const { data: authors, error, isLoading } = useAuthors();
  return (
    <>
      <AuthorGrid authors={authors} isLoading={isLoading} error={error} />
    </>
  )
}

export default AuthorsPage










