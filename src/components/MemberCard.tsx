import {
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import Member from "../models/Member";

interface Props {
  member: Member;
}
const MemberCard = ({ member }: Props) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "300px" }}
        src="https://bit.ly/dan-abramov"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md" _hover={{ color: "blue.400" }}>
            {member.first_name} {member.last_name}
          </Heading>

          <VStack align="start" mt={5} spacing={3}>
            <HStack spacing={1}>
              <Heading size="sm">Email :</Heading>
              <Text>{member.email}</Text>
            </HStack>
            <HStack spacing={1}>
              <Heading size="sm">Phone :</Heading>
              <Text>{member.phone}</Text>
            </HStack>
            <HStack spacing={1}>
              <Heading size="sm">Date of birth :</Heading>
              <Text>{member.date_of_birth}</Text>
            </HStack>
            <HStack spacing={1}>
              <Heading size="sm">Address :</Heading>
              <Text>{member.address}</Text>
            </HStack>
            <HStack spacing={1}>
              <Heading size="sm">Number of borrows :</Heading>
              <Text>{member.borrows_count}</Text>
            </HStack>
            <HStack spacing={1}>
              <Heading size="sm">Number of reservations :</Heading>
              <Text>{member.reservations_count}</Text>
            </HStack>
          </VStack>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="red">
            Delete
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default MemberCard;
