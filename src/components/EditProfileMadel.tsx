import {
  Box,
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
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import useUpdatePicture from "../hooks/useUpdatePicture";
import Profile from "../models/profile";
import ProfileRequest from "../models/ProfileRequest";
import useEditProfile from "../hooks/profile/useEditProfile";
import { EditIcon } from "@chakra-ui/icons";

interface Props {
  profile: Profile;
}

const schema = z.object({
  first_name: z.optional(z.string()),
  last_name: z.optional(z.string()),
  email: z.optional(z.string()),
  password: z.optional(z.string()),
  phone: z.optional(z.string()),
  address: z.optional(z.string()),
  date_of_birth: z.optional(z.string()),
});

type FormValues = z.infer<typeof schema>;

const EditProfileModal = ({ profile }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pictureRef = useRef<HTMLInputElement>(null);
  const { mutate: mutatePicture } = useUpdatePicture(
    "profile",
  );


  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useEditProfile();

  const onsubmit = (data: FormValues) => {

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== '')
    );
    

    mutate({
      id: profile.id,
      ...filteredData,
    } as ProfileRequest);

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
    
      <Button leftIcon={<EditIcon />}
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
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                {...register("first_name")}
                type="text"
                placeholder={profile.first_name}
                id="firstName"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                {...register("last_name")}
                type="text"
                placeholder={profile.last_name}
                id="lastName"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email")}
                type="email"
                placeholder={profile.email}
                id="email"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                {...register("phone")}
                type="text"
                id="phone"
                placeholder={profile.phone}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address")}
                type="text"
                id="address"
                placeholder={profile.address}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                {...register("date_of_birth")}
                type="date"
                id="dateOfBirth"
                placeholder={profile.date_of_birth}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Enter your password"
              />
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


export default EditProfileModal;
