import { Box, Button, HStack, Heading, Image, VStack } from "@chakra-ui/react";
import Book from "../models/Book";
import useDeleteBook from "../hooks/book/useDeleteBook";
import EditBookModal from "./EditBookMadel";
import { Link } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {
  book: Book;
}

const AdminBookCard = ({ book }: Props) => {
  const {mutate, isLoading} = useDeleteBook();

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
        src={`http://127.0.0.1:8000/storage/books/${book.picture}`}
        alt={`${book.title} image`}
      />

      <Box>
        <VStack align="stretch">
          <Heading
            fontSize="1xl"
            textAlign="start"
            _hover={{ color: "blue.400" }}
          >
            <Link to={`/books/${book.id}`}>{book.title}</Link>
          </Heading>
          <HStack justifyContent="space-between" spacing={4} pt={2}>
            <EditBookModal book={book} />
            <Button variant="solid" colorScheme="red" w="100%" leftIcon={<DeleteIcon />}
            disabled={isLoading}
              onClick={() => {
                mutate(book);
              }}
            >
          
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
};

export default AdminBookCard;


