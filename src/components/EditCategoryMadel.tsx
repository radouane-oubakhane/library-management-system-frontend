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
import Category from "../models/Category";
import { z } from "zod";
import { useForm } from "react-hook-form";
import useEditCategory from "../hooks/category/useEditCategory";
import { useRef } from "react";
import useUpdatePicture from "../hooks/useUpdatePicture";
import { EditIcon } from "@chakra-ui/icons";

interface Props {
  category: Category;
}

const schema = z.object({
  name: z.optional(z.string()),
  description: z.optional(z.string()),
});

type FormValues = z.infer<typeof schema>;

const EditCategoryModal = ({ category }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pictureRef = useRef<HTMLInputElement>(null);
  const { mutate: mutatePicture } = useUpdatePicture(
    "categories",
    category.id!
  );

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useEditCategory();

  const onsubmit = (data: FormValues) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );

    mutate({
      id: category.id,
      ...filteredData,
    } as Category);

    if (pictureRef.current) {
      if (pictureRef.current.files?.length) {
        const picture = new FormData();
        picture.append("picture", pictureRef.current.files[0] as File);
        mutatePicture(picture);
      }
    }

    onClose();
    reset();
  };

  return (
    <>
      <Button variant="solid" colorScheme="whatsapp" mr={3} onClick={onOpen} leftIcon={<EditIcon />}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onsubmit)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("name")}
                  type="text"
                  id="name"
                  placeholder={category.name}
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
                  id="description"
                  placeholder={category.description}
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
                    ref={pictureRef}
                    id="picture"
                    type="file"
                    accept="image/*"
                    hidden
                  />
                </Box>
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

export default EditCategoryModal;
