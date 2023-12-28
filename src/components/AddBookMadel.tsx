import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAuthors from "../hooks/author/useAuthors";
import useAddBook from "../hooks/book/useAddBook";
import useCategories from "../hooks/category/useCategories";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const fileSchema = z
  .any()
  .refine((file) => SUPPORTED_FORMATS.includes(file[0]?.type), {
    message:
      "Unsupported file format. Only jpg, jpeg, gif, and png are supported.",
  });

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  category_id: z.string().nonempty({ message: "Please select a category" }),
  author_id: z.string().nonempty({ message: "Please select an author" }),
  isbn: z
    .string()
    .min(3, { message: "ISBN must be at least 3 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  stock: z
    .string()
    .min(1, { message: "Stock must be at least 1 character long" }),
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
  picture: fileSchema,
});

type FormValues = z.infer<typeof schema>;

const AddBookModal = () => {
  const {
    data: authors,
  } = useAuthors();
  const {
    data: categories,
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
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author_id", data.author_id);
    formData.append("book_category_id", data.category_id);
    formData.append("isbn", data.isbn);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("publisher", data.publisher);
    formData.append("published_at", data.published_at);
    formData.append("language", data.language);
    formData.append("edition", data.edition);
    formData.append("picture", data.picture[0]);

    mutate(formData);
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
                {
                  errors.title && (
                    <FormHelperText color="red">
                      {errors.title.message}
                    </FormHelperText>
                  )
                }
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>ISBN</FormLabel>
                <Input
                  {...register("isbn")}
                  type="text"
                  placeholder="ISBN"
                  id="isbn"
                />
                {
                  errors.isbn && (
                    <FormHelperText color="red">
                      {errors.isbn.message}
                    </FormHelperText>
                  )
                }
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
                {
                  errors.category_id && (
                    <FormHelperText color="red">
                      {errors.category_id.message}
                    </FormHelperText>
                  )
                }
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
                {
                  errors.author_id && (
                    <FormHelperText color="red">
                      {errors.author_id.message}
                    </FormHelperText>
                  )
                }
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description")}
                  id="description"
                  height="100px"
                  placeholder="Description"
                />
                {
                  errors.description && (
                    <FormHelperText color="red">
                      {errors.description.message}
                    </FormHelperText>
                  )
                }
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Stock</FormLabel>
                <Input
                  {...register("stock")}
                  type="number"
                  placeholder="Stock"
                  id="stock"
                />
                {
                  errors.stock && (
                    <FormHelperText color="red">
                      {errors.stock.message}
                    </FormHelperText>
                  )
                }
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Publisher</FormLabel>
                <Input
                  {...register("publisher")}
                  type="text"
                  placeholder="Publisher"
                  id="publisher"
                />
                {
                  errors.publisher && (
                    <FormHelperText color="red">
                      {errors.publisher.message}
                    </FormHelperText>
                  )
                }
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Publisher Date</FormLabel>
                <Input
                  {...register("published_at")}
                  type="date"
                  placeholder="Publisher Date"
                  id="published_at"
                />
                {
                  errors.published_at && (
                    <FormHelperText color="red">
                      {errors.published_at.message}
                    </FormHelperText>
                  )
                }
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Language</FormLabel>
                <Input
                  {...register("language")}
                  type="text"
                  placeholder="Language"
                  id="language"
                />
                {
                  errors.language && (
                    <FormHelperText color="red">
                      {errors.language.message}
                    </FormHelperText>
                  )
                }
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Edition</FormLabel>
                <Input
                  {...register("edition")}
                  type="text"
                  placeholder="Edition"
                  id="edition"
                />
                {
                  errors.edition && (
                    <FormHelperText color="red">
                      {errors.edition.message}
                    </FormHelperText>
                  )
                }
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Book Cover</FormLabel>
                <Box
                  as="label"
                  htmlFor="picture"
                  px={4}
                  py={2}
                  lineHeight="short"
                  borderRadius="md"
                  color="white"
                  
                  _hover={{ bg: "gray.600" }}
                  cursor="pointer"
                  width="100%"
                  textAlign="center"
                >
                  Upload Picture
                  <Input
                  {...register("picture")}
                  id="picture"
                  type="file"
                  accept="image/*"
                  hidden
                />
                </Box>
                {
                  errors.picture && (
                    <FormHelperText color="red">
                      {errors.picture.message?.toString()}
                    </FormHelperText>
                  )
                }
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
