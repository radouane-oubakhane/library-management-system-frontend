import { useParams } from "react-router-dom";
import {
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  Image,
  VStack,
  Text,
  Skeleton,
  HStack,
  Box,
} from "@chakra-ui/react";
import BookGrid from "../components/BookGrid";
import { ExpandableText } from "../components/ExpandableText";
import AuthorDetailPageSkeleton from "../components/AuthorDetailPageSkeleton";
import BookCard from "../components/BookCard";
import { useState } from "react";
import SearchInput from "../components/SearchInput";
import useBook from "../hooks/book/useBook";
import useCategoryBooks from "../hooks/category/useCategryBooks";
import BookInfo from "../components/BookInfo";
import useAuth from "../hooks/auth/useAuth";
import AdminBookCard from "../components/AdminBookCard";
import EditBookModal from "../components/EditBookMadel";

const BookDetailPage = () => {
  const { bookId } = useParams<{ bookId?: string }>();
  const {
    data: book,
    isLoading: bookIsLoading,
    error: bookError,
  } = useBook(bookId!);

  const {
    data: books,
    isLoading: booksIsLoading,
    error: booksError,
  } = useCategoryBooks(book?.category?.id.toString()!);

  const {user} = useAuth();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks =
    searchTerm === ""
      ? books
      : books?.filter((book) =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  if (bookIsLoading) return <AuthorDetailPageSkeleton />;

  if (bookError)
    return (
      <Text fontSize="2xl" textAlign="center">
        {bookError.message}
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
              src={`http://127.0.0.1:8000/storage/books/${book.picture}`}
              alt={`${book?.title} cover`}
            />
          </Center>
          {book && <BookInfo book={book} />}
          
        </GridItem>
        <GridItem area="details" paddingX={8} paddingY={14}>
        <HStack spacing={10} justify="space-between" align="start">
          <VStack spacing={4} align="stretch">
            <Heading fontSize="2xl" fontWeight="bold">
              {book?.title}
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
            <ExpandableText>{book?.description}</ExpandableText>
          </VStack>
          {user?.is_admin && (
          <Box>
              <EditBookModal book={book} />
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
                `More ${book?.category?.name} Books`
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

export default BookDetailPage;


