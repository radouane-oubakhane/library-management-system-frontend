import {
  Button,
  Center,
  HStack,
  Heading,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import Member from "../models/Member";
import useDeleteMember from "../hooks/member/useDeleteMember";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {
  member: Member;
}

const MemberModal = ({ member }: Props) => {
  const { mutate, isLoading } = useDeleteMember();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text cursor="pointer" onClick={onOpen}>
        {member.first_name} {member.last_name}
      </Text>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {member.first_name} {member.last_name}
          </ModalHeader>
          <Center>
            <Image
              borderRadius={10}
              objectFit="cover"
              maxW={{ base: "100%", sm: "300px" }}
              src={`http://127.0.0.1:8000/storage/members/${member.picture}`}
              alt="Caffe Latte"
            />
          </Center>
          <ModalCloseButton />
          <VStack align="start" mt={5} spacing={3} px={4}>
            <HStack spacing={1}>
              <Heading size="sm">Email :</Heading>
              <Text>{member.email}</Text>
            </HStack>
            <HStack spacing={1}>
              <Heading size="sm">Phone :</Heading>
              <Text>{member.phone}</Text>
            </HStack>
          </VStack>

          <ModalFooter>
          <Button variant="solid" colorScheme="red" w="100%" mr={3} leftIcon={<DeleteIcon />}
          onClick={() => mutate(member)}
          isLoading={isLoading}
          >
            {isLoading ? "Loading..." : "Delete"}
          </Button>
            <Button colorScheme="blue"  w="100%" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MemberModal;



