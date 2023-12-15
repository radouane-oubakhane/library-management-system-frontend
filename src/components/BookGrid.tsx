import { SimpleGrid, Text } from "@chakra-ui/react";
import CardContainer from "./CardContainer";
import CardSkeleton from "./CardSkeleton";
import useBooks from "../hooks/useBooks";
import BookCard from "./BookCard";

const BookGrid = () => {
  const { data: books, error, isLoading } = useBooks();
  const skeletons = Array(12).fill(0);

  if (error)
    return (
      <Text fontSize="2xl" textAlign="center">
        {error.message}
      </Text>
    );

  return (
    <SimpleGrid
      columns={{ sm: 2, md: 3, lg: 4, xl: 6 }}
      spacing={10}
      padding="20px"
    >
      {isLoading &&
        skeletons.map((_, index) => (
          <CardContainer key={index}>
            <CardSkeleton />
          </CardContainer>
        ))}
      {books?.map(book => (
        <CardContainer key={book.id}>
          <BookCard book={book} />
        </CardContainer>
      ))}
    </SimpleGrid>
  );
};

export default BookGrid;
