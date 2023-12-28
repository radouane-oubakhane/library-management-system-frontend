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
import useAddAuthor from "../hooks/author/useAddAuthor";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const fileSchema = z
  .any()
  .refine((file) => SUPPORTED_FORMATS.includes(file[0]?.type), {
    message:
      "Unsupported file format. Only jpg, jpeg, gif, and png are supported.",
  });

const schema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" })
    .max(20, { message: "First name must be at most 20 characters long" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long" })
    .max(20, { message: "Last name must be at most 20 characters long" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters long" }),
  address: z.string().min(10, { message: "Address must be at least 10 characters long" }),
  dateOfBirth: z.string().min(10, { message: "Enter a valid date" }),
  biography: z.string().min(10, { message: "Biography must be at least 10 characters long" }),
  picture: fileSchema,
});


type FormValues = z.infer<typeof schema>;


const AddAuthorModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {handleSubmit,
   register, reset, formState: {errors, isValid}} = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const {mutate} = useAddAuthor();


  const onsubmit = (data: FormValues) => {

    const formData = new FormData(); 
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("date_of_birth", data.dateOfBirth);
    formData.append("biography", data.dateOfBirth);
    formData.append("picture", data.picture[0]);

    mutate(formData);

    onClose();
    reset();
  }

  return (
    <>
      <Button variant="solid" 
        colorScheme="blue" mr={3} onClick={onOpen}  >
        Add New Author
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <form>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Author</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                {...register("firstName")}
                type="text" 
                placeholder="First name"
                id="firstName"
              />
              {errors.firstName && <FormHelperText color="red">{errors.firstName.message}</FormHelperText>}
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                {...register("lastName")}
                type="text"
                placeholder="First name"
                id="lastName"
              />
              {errors.lastName && <FormHelperText color="red">{errors.lastName.message}</FormHelperText>}
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email")}
                type="email"
                placeholder="Email"
                id="email"
              />
              {errors.email && <FormHelperText color="red">{errors.email.message}</FormHelperText>}
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                {...register("phone")}
                type="text"
                id="phone"
                placeholder="Phone"
              />
              {errors.phone && <FormHelperText color="red">{errors.phone.message}</FormHelperText>}
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address")}
                type="text"
                id="address"
                placeholder="Address"
              />
              {errors.address && <FormHelperText color="red">{errors.address.message}</FormHelperText>}
            </FormControl>

            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                {...register("dateOfBirth")}
                type="date"
                id="dateOfBirth"
                placeholder="Date of Birth"
              />
              {errors.dateOfBirth && <FormHelperText color="red">{errors.dateOfBirth.message}</FormHelperText>}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Biography</FormLabel>
              <Textarea height="100px"
                {...register("biography")}
                id="biography"
                placeholder="Biography"
              />
              {errors.biography && <FormHelperText color="red">{errors.biography.message}</FormHelperText>}
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
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" disabled={!isValid} onClick={handleSubmit(onsubmit)}>
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

export default AddAuthorModal;


