import {
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

interface Props {
  category: Category;
}

const schema = z.object({
  name: z.optional(
    z.string()

  ),
  description: z.optional(
  z.string()
  ),
  picture: z.optional(
   z.string()),
});

type FormValues = z.infer<typeof schema>;


const EditCategoryModal = ({ category }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const {mutate} = useEditCategory();

  
  const onsubmit = (data: FormValues) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== '')
    );

    mutate({
      id: category.id,
      ...filteredData,
    } as Category);

    onClose();
    reset();
  }

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
        isOpen={isOpen}
        onClose={onClose}
      >
        <form 
        onSubmit={handleSubmit(onsubmit)}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
            <FormLabel>Name</FormLabel>
              <Input {...register("name")} type="text" id="name" 
              placeholder={category.name}
              />
              {errors.name && <FormHelperText color="red">{errors.name.message}</FormHelperText>}

            
            </FormControl>


            <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
              <Textarea {...register("description")} id="description"
              placeholder={category.description}
              />
              {errors.description && <FormHelperText color="red">{errors.description.message}</FormHelperText>}
      
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Picture</FormLabel>
              <Input {...register("picture")} type="text"  id="picture"
              placeholder={category.picture}
              />
              {errors.picture && <FormHelperText color="red">{errors.picture.message}</FormHelperText>}

            </FormControl>
          </ModalBody>

          <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit" disabled={!isValid}>

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
