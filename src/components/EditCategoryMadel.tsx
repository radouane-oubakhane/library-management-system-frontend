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
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import Category from "../models/Category";

interface Props {
  category: Category;
}

const EditCategoryModal = ({ category }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        variant="solid"
        colorScheme="whatsapp"
        mr={3}
        
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
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="First name"
                value={category.name}
              />
            </FormControl>


            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Here is a sample placeholder"
                value={category.description}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Picture</FormLabel>
              <Input type="file" accept="image/*"/>
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

export default EditCategoryModal;
