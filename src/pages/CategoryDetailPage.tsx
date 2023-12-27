import { useParams } from "react-router-dom";
import useCategoryBooks from "../hooks/category/useCategryBooks";
import useCategory from "../hooks/category/useCategory";
import {
  Box,
  Text,
  Flex,
  Heading,
  Skeleton,
  Stack,
  HStack,
} from "@chakra-ui/react";
import BookGrid from "../components/BookGrid";
import BookCard from "../components/BookCard";
import { useState } from "react";
import SearchInput from "../components/SearchInput";
import useAuth from "../hooks/auth/useAuth";
import AdminBookCard from "../components/AdminBookCard";

const CategoryDetailPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const {
    data: category,
    isLoading: categoryIsLoading,
    error: categoryError,
  } = useCategory(categoryId!);
  const {
    data: books,
    isLoading: booksIsLoading,
    error: booksError,
  } = useCategoryBooks(categoryId!);
  const {user} = useAuth();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks =
    searchTerm === ""
      ? books
      : books?.filter((book) =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  if (categoryError)
    return (
      <Text fontSize="2xl" textAlign="center">
        {categoryError.message}
      </Text>
    );

  return (
    <>
      <Box position="relative" height="200px">
        <Box
          bgImage={`http://127.0.0.1:8000/storage/categories/${category?.picture}`}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          height="100%"
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          filter="brightness(50%)"
        />

        <Flex
          direction="row"
          align="center"
          justify="space-between"
          color="white"
          p={5}
          position="relative"
        >
          <Box flex="1">
            <Heading as="h1" size="3xl">
              {categoryIsLoading ? "Loading..." : ""}
              {category?.name}
            </Heading>
          </Box>
          {categoryIsLoading && (
            <Stack>
              <Skeleton height="10px" width="400px" />
              <Skeleton height="10px" width="400px" />
              <Skeleton height="10px" width="400px" />
            </Stack>
          )}
          <Text>{category?.description}</Text>
        </Flex>
      </Box>
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
            "Books in this category"
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
    </>
  );
};

export default CategoryDetailPage;
