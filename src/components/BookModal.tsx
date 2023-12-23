import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Image,
  Center,
} from "@chakra-ui/react";
import Book from "../models/Book";
import EditBookModal from "./EditBookMadel";
import useDeleteBook from "../hooks/book/useDeleteBook";
import { Link } from "react-router-dom";

interface Props {
  book: Book;
}

const BookModal = ({ book }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteBook();

  return (
    <>
      <Text cursor="pointer" onClick={onOpen}>
        {book.title}
      </Text>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="start" _hover={{ color: "blue.400" }}>
            <Link to={`/books/${book.id}`}>{book.title}</Link>
          </ModalHeader>
          <Center>
            <Image
              maxH="400px"
              borderRadius={10}
              overflow="hidden"
              src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781421577449/vagabond-vol-37-9781421577449_hr.jpg"
              alt={`${book.title} image`}
            />
          </Center>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              {book.description}
            </Text>
          </ModalBody>

          <ModalFooter>
            <EditBookModal book={book} />
            <Button
              variant="solid"
              colorScheme="red"
              w="100%"
              disabled={isLoading}
              onClick={() => {
                mutate(book);
                onClose();
              }}
              mr={3}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
            <Button colorScheme="blue" mr={3} w="100%" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookModal;
