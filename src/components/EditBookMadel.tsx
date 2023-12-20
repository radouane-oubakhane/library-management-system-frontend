import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea, // Add this import
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import React from "react";
import Book from "../models/Book";
import useAuthors from "../hooks/author/useAuthors";
import useCategories from "../hooks/category/useCategories";

interface Props {
  book: Book;
}

const EditBookModal = ({ book }: Props) => {
  const {
    data: authors,
    isLoading: authorsLoading,
    error: authorsError,
  } = useAuthors();
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        variant="solid"
        colorScheme="whatsapp"
        mr={3}
        w="100%"
        onClick={onOpen}
      >
        Edit
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="First name"
                value={book.title}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>ISBN</FormLabel>
              <Input placeholder="Last name" value={book.isbn} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select placeholder={book.category?.name}>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Author</FormLabel>
              <Select
                placeholder={
                  book.author_first_name + " " + book.author_last_name
                }
              >
                {authors?.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.first_name + " " + author.last_name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                height="100px"
                placeholder="Here is a sample placeholder"
                value={book.description}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Stock</FormLabel>
              <Input placeholder="Last name" value={book.stock} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Publisher</FormLabel>
              <Input placeholder="Last name" value={book.publisher} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Publisher Date</FormLabel>
              <Input placeholder="Last name" value={book.isbn} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Language</FormLabel>
              <Input placeholder="Last name" value={book.language} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Edition</FormLabel>
              <Input placeholder="Last name" value={book.edition} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Book Cover</FormLabel>
              <Input type="file" accept="image/*" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditBookModal;
