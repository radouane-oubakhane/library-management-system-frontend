import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AdminBookCard from "../components/AdminBookCard";
import AuthorDetailPageSkeleton from "../components/AuthorDetailPageSkeleton";
import AuthorInfo from "../components/AuthorInfo";
import BookCard from "../components/BookCard";
import BookGrid from "../components/BookGrid";
import EditAuthorModal from "../components/EditAuthorMadel";
import { ExpandableText } from "../components/ExpandableText";
import SearchInput from "../components/SearchInput";
import useAuth from "../hooks/auth/useAuth";
import useAuthor from "../hooks/author/useAuthor";
import useAuthorBooks from "../hooks/author/useAuthorBooks";

const AuthorDetailPage = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const {
    data: author,
    isLoading: authorIsLoading,
    error: authorError,
  } = useAuthor(authorId!);
  const {
    data: books,
    isLoading: booksIsLoading,
    error: booksError,
  } = useAuthorBooks(authorId!);
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks =
    searchTerm === ""
      ? books
      : books?.filter((book) =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  if (authorIsLoading) return <AuthorDetailPageSkeleton />;

  if (authorError)
    return (
      <Text fontSize="2xl" textAlign="center">
        {authorError.message}
      </Text>
    );

  return (
    <>
      <Grid
        paddingBottom={6}
        justifyContent="center"
        templateAreas={{
          base: `"image" "details" "divider" "cast"`,
          sm: `"image details" "divider divider" "cast cast"`,
        }}
        templateColumns={{
          base: "1fr",
          sm: "300px 1fr",
        }}
      >
        <GridItem area="image" padding={10}>
          <Center>
            <Image
              justifyContent="center"
              boxShadow="md"
              borderRadius={20}
              overflow="hidden"
              blur="0px"
              src={`http://127.0.0.1:8000/storage/authors/${author.picture}`}
              alt={`${author?.last_name}, ${author?.first_name} profile picture`}
            />
          </Center>
          {author && <AuthorInfo author={author} />}
        </GridItem>
        <GridItem area="details" paddingX={8} paddingY={14}>
          <HStack spacing={10} justify="space-between" align="start">
            <VStack spacing={4} align="stretch">
              <Heading fontSize="2xl" fontWeight="bold">
                {author?.first_name} {author?.last_name}
              </Heading>

              <Heading
                fontSize="xl"
                fontWeight="bold"
                as="h1"
                textAlign="start"
                paddingTop={8}
              >
                biography
              </Heading>
              <ExpandableText>{author?.biography}</ExpandableText>
            </VStack>
            {user?.is_admin && (
              <Box>
                <EditAuthorModal author={author} />
              </Box>
            )}
          </HStack>
        </GridItem>
        <GridItem area="divider">
          <Divider mt="30px" />
        </GridItem>
        <GridItem area="cast">
          <HStack
            spacing={10}
            justify="space-between"
            align="center"
            px={"20px"}
          >
            <Heading as="h2" size="lg">
              {booksIsLoading ? (
                <Skeleton height="30px" width="400px" />
              ) : (
                `Books by ${author?.first_name} ${author?.last_name}`
              )}
            </Heading>
            <Box flex={1}>
              <SearchInput setSearchTerm={setSearchTerm} />
            </Box>
          </HStack>
          <BookGrid
            books={filteredBooks}
            isLoading={booksIsLoading}
            error={booksError}
            BookCardComponent={user?.is_admin ? AdminBookCard : BookCard}
          />
        </GridItem>
      </Grid>

      <Divider />
    </>
  );
};

export default AuthorDetailPage;
