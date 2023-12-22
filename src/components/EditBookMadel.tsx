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
  Textarea, 
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import Book from "../models/Book";
import useAuthors from "../hooks/author/useAuthors";
import useCategories from "../hooks/category/useCategories";
import { z } from "zod";
import { useForm } from "react-hook-form";
import useEditBook from "../hooks/book/useEditBook";

interface Props {
  book: Book;
}


const schema = z.object({
  title: z.optional(z.string()),
    book_category_id: z.optional(z.string()),
    author_id: z.optional(z.string()),
  isbn: z.optional(z.string()),
  description: z.optional(z.string()),
  stock: z.optional(z.string()),
  publisher: z.optional(z.string()),
  published_at: z.optional(z.string()),
  language: z.optional(z.string()),
  edition: z.optional(z.string()),
  picture: z.optional(z.string()),
});

type FormValues = z.infer<typeof schema>;


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

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useEditBook();

  const onSubmit = (data: FormValues) => {

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== '')
    );


    mutate({
      id: book.id,
      ...filteredData,
    } as Book);
    reset();
    onClose();
  };

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
                {...register("title")}
                type="text"
                placeholder={book.title}
                id="title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>ISBN</FormLabel>
              <Input
                {...register("isbn")}
                type="text"
                placeholder={book.isbn}
                id="isbn"
               />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Select
                  {...register("book_category_id")}
                  placeholder={book.category?.name}
                  id="category_id"
                >
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
                  {...register("author_id")}
                  placeholder={book.author_first_name + " " + book.author_first_name}
                  id="author_id"
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
                  {...register("description")}
                  id="description"
                  height="100px"
                  placeholder={book.description}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Stock</FormLabel>
                <Input
                  {...register("stock")}
                  type="number"
                  placeholder={Number(book.stock).toString()}
                  id="stock"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Publisher</FormLabel>
                <Input
                  {...register("publisher")}
                  type="text"
                  placeholder={book.publisher}
                  id="publisher"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Publisher Date</FormLabel>
                <Input
                  {...register("published_at")}
                  type="date"
                  placeholder={book.published_at}
                  id="published_at"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Language</FormLabel>
                <Input
                  {...register("language")}
                  type="text"
                  placeholder={book.language}
                  id="language"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Edition</FormLabel>
                <Input
                  {...register("edition")}
                  type="text"
                  placeholder={book.edition}
                  id="edition"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Book Cover</FormLabel>
                <Input 
                {...register("picture")} 
                type="text" 
                placeholder={book.picture}
                id="picture" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                disabled={!isValid}
                onClick={handleSubmit(onSubmit)}
              >
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
