import AuthorGrid from "../components/AuthorGrid";
import useAuthors from "../hooks/useAuthors";

const AuthorsPage = () => {
  const { data: authors, error, isLoading } = useAuthors();
  return (
    <>
      <AuthorGrid authors={authors} isLoading={isLoading} error={error} />
    </>
  )
}

export default AuthorsPage










