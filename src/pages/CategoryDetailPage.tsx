import { useParams } from "react-router-dom";
import useCategoryBooks from "../hooks/category/useCategryBooks";
import useCategory from "../hooks/category/useCategory";
import { Box, Text, Flex, Heading, Skeleton, Stack } from "@chakra-ui/react";
import BookGrid from "../components/BookGrid";
import BookCard from "../components/BookCard";

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
          bgImage="https://www.eecs.mit.edu/wp-content/uploads/2021/06/compscihero-1024x545.jpg"
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
      <Heading as="h2" size="lg" p={5}>
        {booksIsLoading ? <Skeleton height="30px" width="400px" /> : "Books in this category"}
       
      </Heading>
      <BookGrid books={books} isLoading={booksIsLoading} error={booksError} BookCardComponent={BookCard} />
    </>
  );
};

export default CategoryDetailPage;
