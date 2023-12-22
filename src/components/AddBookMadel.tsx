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
import useAuthors from "../hooks/author/useAuthors";
import useCategories from "../hooks/category/useCategories";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import useAddBook from "../hooks/book/useAddBook";
import Book from "../models/Book";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
    category_id: z.string().nonempty({ message: 'Please select a category' }),
    author_id: z.string().nonempty({ message: 'Please select an author' }),
  isbn: z
    .string()
    .min(3, { message: "ISBN must be at least 3 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  stock: z.string().min(1, { message: "Stock must be at least 1 character long" }),
  publisher: z
    .string()
    .min(3, { message: "Publisher must be at least 3 characters long" }),
  published_at: z.string().min(10, { message: "Enter a valid date" }),
  language: z
    .string()
    .min(3, { message: "Language must be at least 3 characters long" }),
  edition: z
    .string()
    .min(3, { message: "Edition must be at least 3 characters long" }),
  picture: z.string().url({ message: "Please enter a valid URL" }),
});

type FormValues = z.infer<typeof schema>;

const AddBookModal = () => {
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

  const { mutate } = useAddBook();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    mutate({
      title: data.title,
      author_id: Number(data.author_id),
      book_category_id: Number(data.category_id),
      isbn: data.isbn,
      description: data.description,
      stock: Number(data.stock),
      publisher: data.publisher,
      published_at: data.published_at,
      language: data.language,
      edition: data.edition,
      picture: data.picture,
    } as Book);
    reset();
    onClose();
  };

  return (
    <>
      <Button variant="solid" colorScheme="blue" mr={3} onClick={onOpen}>
        Add New Book
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Book</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  {...register("title")}
                  type="text"
                  placeholder="Title"
                  id="title"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>ISBN</FormLabel>
                <Input
                  {...register("isbn")}
                  type="text"
                  placeholder="ISBN"
                  id="isbn"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Select
                  {...register("category_id")}
                  placeholder="Select category"
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
                  placeholder="Select author"
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
                  placeholder="Description"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Stock</FormLabel>
                <Input
                  {...register("stock")}
                  type="number"
                  placeholder="Stock"
                  id="stock"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Publisher</FormLabel>
                <Input
                  {...register("publisher")}
                  type="text"
                  placeholder="Publisher"
                  id="publisher"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Publisher Date</FormLabel>
                <Input
                  {...register("published_at")}
                  type="date"
                  placeholder="Publisher Date"
                  id="published_at"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Language</FormLabel>
                <Input
                  {...register("language")}
                  type="text"
                  placeholder="Language"
                  id="language"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Edition</FormLabel>
                <Input
                  {...register("edition")}
                  type="text"
                  placeholder="Edition"
                  id="edition"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Book Cover</FormLabel>
                <Input {...register("picture")} type="text" id="picture" />
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
        </form>
      </Modal>
    </>
  );
};

export default AddBookModal;
