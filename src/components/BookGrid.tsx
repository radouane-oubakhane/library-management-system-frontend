import { SimpleGrid, Text } from "@chakra-ui/react";
import CardContainer from "./CardContainer";
import CardSkeleton from "./CardSkeleton";
import Book from "../models/Book";
import { FunctionComponent } from "react";

interface Props {
  books?: Book[];
  isLoading: boolean;
  error: Error | null;
  BookCardComponent: FunctionComponent<{ book: Book }>;
}


const BookGrid = ({ books, isLoading, error, BookCardComponent }: Props) => {
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
      {books?.map((book, index) => (
        <CardContainer key={index}>
          <BookCardComponent book={book} />
        </CardContainer>
      ))}
    </SimpleGrid>
  );
};

export default BookGrid;
