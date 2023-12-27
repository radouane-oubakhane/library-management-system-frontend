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
  import Member from "../models/Member";
  import { z } from "zod";
  import { useForm } from "react-hook-form";
  import useEditProfile from "../hooks/profile/useEditProfile";
  
  
  const schema = z.object({
    address: z.optional(
      z.string()
    ),
    email: z.optional(
    z.string()
    ),
    phone: z.optional(
     z.string()),
    first_name: z.optional(
        z.string()
    ),
    last_name: z.optional(
        z.string()
    ),
  });
  
  type FormValues = z.infer<typeof schema>;
  
  
  const EditProfileModal = ({ profile }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const {
      handleSubmit,
      register,
      reset,
      formState: { errors, isValid },
    } = useForm<FormValues>({
      resolver: zodResolver(schema),
    });
  
    const {mutate} = useEditProfile();
  
    
    const onsubmit = (data: FormValues) => {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== '')
      );
  
      mutate({
        id: profile.id,
        ...filteredData,
      } as Member);
  
      onClose();
      reset();
    }
  
    return (
      <>
        <Button
         
         
          
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
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
              <FormLabel>first name</FormLabel>
                <Input {...register("first_name")} type="text" id="first_name" 
                placeholder={profile.first_name}
                />
                {errors.first_name && <FormHelperText color="red">{errors.first_name.message}</FormHelperText>}
              </FormControl>
              <FormControl>
              <FormLabel>last name</FormLabel>
                <Input {...register("last_name")} type="text" id="last_name" 
                placeholder={profile.last_name}
                />
                {errors.last_name && <FormHelperText color="red">{errors.last_name.message}</FormHelperText>}
              </FormControl>
              <FormControl>
              <FormLabel>email</FormLabel>
                <Input {...register("email")} type="text" id="email" 
                placeholder={profile.email}
                />
                {errors.email && <FormHelperText color="red">{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl>
              <FormLabel>phone</FormLabel>
                <Input {...register("phone")} type="text" id="phone" 
                placeholder={profile.phone}
                />
                {errors.phone && <FormHelperText color="red">{errors.phone.message}</FormHelperText>}
              </FormControl>

              <FormControl>
              <FormLabel>address</FormLabel>
                <Textarea {...register("address")}  id="address" 
                placeholder={profile.address}
                />
                {errors.address && <FormHelperText color="red">{errors.address.message}</FormHelperText>}
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
  
  export default EditProfileModal;
  