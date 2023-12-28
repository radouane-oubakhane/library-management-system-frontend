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
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAddCategory from "../hooks/category/useAddCategory";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const fileSchema = z
  .any()
  .refine((file) => SUPPORTED_FORMATS.includes(file[0]?.type), {
    message:
      "Unsupported file format. Only jpg, jpeg, gif, and png are supported.",
  });

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Category name must be at least 3 characters long" })
    .max(20, { message: "Category name must be at most 20 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  picture: fileSchema,
});

type FormValues = z.infer<typeof schema>;

const AddCategoryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useAddCategory();

  const onsubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("picture", data.picture[0]);
    mutate(formData);

    onClose();
    reset();
  };

  return (
    <>
      <Button variant="solid" colorScheme="blue" mr={3} onClick={onOpen}>
        Add New Category
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onsubmit)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Category name"
                  id="name"
                />
                {errors.name && (
                  <FormHelperText color="red">
                    {errors.name.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description")}
                  placeholder="Category description"
                  id="description"
                />
                {errors.description && (
                  <FormHelperText color="red">
                    {errors.description.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Picture</FormLabel>
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
                {errors.picture && (
                  <FormHelperText color="red">
                    {errors.picture.message?.toString()}
                  </FormHelperText>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                disabled={!isValid}
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

export default AddCategoryModal;
