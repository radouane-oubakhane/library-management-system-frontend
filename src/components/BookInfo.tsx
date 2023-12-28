import { Box, HStack, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Book from "../models/Book";

interface Props {
  book: Book;
}

const BookInfo = ({ book }: Props) => {
  return (
    <VStack paddingTop={10} spacing={4} align="stretch">
      <Heading as="h2" size="md">
        Book Info
      </Heading>
      <SimpleGrid columns={2} spacing={10}>
      <Box h="40px">
        <Text fontSize="md" fontWeight="bold">
          Author
        </Text>
        <Text fontSize="md">
          {book.author_first_name} {book.author_last_name}
          </Text>
      </Box>
      <Box h="40px">
        <Text fontSize="md" fontWeight="bold">
          Category
        </Text>
        <Text fontSize="md">{book.category?.name}</Text>
      </Box>
      
      <Box h="40px">
        <Text fontSize="md" fontWeight="bold">
          Edition
        </Text>
        <HStack>
          <Text fontSize="md">{book.edition}</Text>
        </HStack>
      </Box>
      <Box h="40px">
        <Text fontSize="md" fontWeight="bold">
          ISBN
        </Text>
        <Text fontSize="md">{book.isbn}</Text>
      </Box>
      <Box h="40px">
        <Text fontSize="md" fontWeight="bold">
          Publisher
        </Text>
        <Text fontSize="md">{book.publisher}</Text>
      </Box>
      <Box h="40px">
        <Text fontSize="md" fontWeight="bold">
          Published Date
        </Text>
        <Text fontSize="md">{book.published_at}</Text>
      </Box>
      <Box h="40px">
        <Text fontSize="md" fontWeight="bold">
          Language
        </Text>
        <Text fontSize="md">{book.language}</Text>
      </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default BookInfo;
