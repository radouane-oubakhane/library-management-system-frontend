import { SimpleGrid, Text } from "@chakra-ui/react";
import CardContainer from "./CardContainer";
import CardSkeleton from "./CardSkeleton";
import BookCard from "./BookCard";
import Book from "../models/Book";

interface Props {
  books?: Book[];
  isLoading: boolean;
  error: Error | null;
}


const BookGrid = ({ books, isLoading, error }: Props) => {
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
      padding="10px"
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
