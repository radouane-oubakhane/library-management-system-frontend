import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, // Add this import
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Author from "../models/Author";

interface Props {
  author: Author;
}

const EditAuthorModal = ({ author }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button variant="solid" colorScheme="whatsapp" mr={3} onClick={onOpen}  w="100%">
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
          <ModalHeader>Edit Author</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="First name"
                value={author.first_name}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="First name"
                value={author.last_name}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Email"
                value={author.email}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Phone"
                value={author.phone}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Address"
                value={author.address}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                placeholder="Date of Birth"
                value={author.date_of_birth}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Biography</FormLabel>
              <Textarea height="100px"
                placeholder="Here is a sample placeholder"
                value={author.biography}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Picture</FormLabel>
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

export default EditAuthorModal;


