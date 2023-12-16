import { useParams } from "react-router-dom";
import useAuthor from "../hooks/useAuthor";
import useAuthorBooks from "../hooks/useAuthorBooks";
import {
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react";
import BookGrid from "../components/BookGrid";
import { ExpandableText } from "../components/ExpandableText";
import AuthorInfo from "../components/AuthorInfo";
import AuthorDetailPageSkeleton from "../components/AuthorDetailPageSkeleton";

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
              src="https://bit.ly/dan-abramov"
              alt={`${author?.last_name}, ${author?.first_name} profile picture`}
            />
          </Center>
          {author && <AuthorInfo author={author} />}
        </GridItem>
        <GridItem area="details" paddingX={8} paddingY={14}>
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
        </GridItem>
        <GridItem area="divider">
          <Divider my="30px" />
        </GridItem>
        <GridItem area="cast" paddingX={8}>
          <BookGrid
            books={books}
            isLoading={booksIsLoading}
            error={booksError}
          />
        </GridItem>
      </Grid>

      <Divider />
    </>
  );
};

export default AuthorDetailPage;


