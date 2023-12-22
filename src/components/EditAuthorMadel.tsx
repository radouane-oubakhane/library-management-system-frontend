import {
  Button,
  FormControl,
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
import Author from "../models/Author";
import { z } from "zod";
import { useForm } from "react-hook-form";
import useEditAuthor from "../hooks/author/useEddAuthor";

interface Props {
  author: Author;
}

const schema = z.object({
  first_name: z.optional(z.string()),
  last_name: z.optional(z.string()),
  email: z.optional(z.string()),
  phone: z.optional(z.string()),
  address: z.optional(z.string()),
  date_of_birth: z.optional(z.string()),
  biography: z.optional(z.string()),
  picture: z.optional(z.string()),
});

type FormValues = z.infer<typeof schema>;

const EditAuthorModal = ({ author }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useEditAuthor();

  const onsubmit = (data: FormValues) => {

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== '')
    );
    mutate({
      id: author.id,
      ...filteredData,
    } as Author);

    onClose();
    reset();
  };

  return (
    <>
      <Button
        variant="solid"
        colorScheme="whatsapp"
        mr={3}
        onClick={onOpen}
        w="100%"
      >
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Author</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                {...register("first_name")}
                type="text"
                placeholder={author.first_name}
                id="firstName"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                {...register("last_name")}
                type="text"
                placeholder={author.last_name}
                id="lastName"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email")}
                type="email"
                placeholder={author.email}
                id="email"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                {...register("phone")}
                type="text"
                id="phone"
                placeholder={author.phone}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address")}
                type="text"
                id="address"
                placeholder={author.address}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                {...register("date_of_birth")}
                type="date"
                id="dateOfBirth"
                placeholder={author.date_of_birth}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Biography</FormLabel>
              <Textarea height="100px"
                {...register("biography")}
                id="biography"
                placeholder={author.biography}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Picture</FormLabel>
              <Input
                {...register("picture")}
                id="picture"
                type="text"
                placeholder={author.picture}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit" disabled={!isValid} onClick={handleSubmit(onsubmit)}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditAuthorModal;
