import { Box, Button, HStack, Heading, Image, VStack } from "@chakra-ui/react";
import Book from "../models/Book";

interface Props {
  book: Book;
}

const AdminBookCard = ({ book }: Props) => {
  return (
    <VStack spacing={4} align="stretch">
      <Image
        _hover={{
          transform: "scale(1.03)",
          transition: "transform 0.15s ease-in-out",
        }}
        boxShadow="md"
        borderRadius={10}
        overflow="hidden"
        src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781421577449/vagabond-vol-37-9781421577449_hr.jpg"
        alt={`${book.title} image`}
      />

      <Box>
        <VStack align="stretch">
          <Heading
            fontSize="1xl"
            textAlign="start"
            _hover={{ color: "blue.400" }}
          >
            {book.title}
          </Heading>
          <HStack justifyContent="space-between" spacing={4} pt={2}>
            <Button variant="solid" colorScheme="whatsapp" mr={3} w="100%">
              Edit
            </Button>
            <Button variant="solid" colorScheme="red" w="100%">
              Delete
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
};

export default AdminBookCard;

