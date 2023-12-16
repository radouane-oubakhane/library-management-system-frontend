import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Author from "../models/Author";
import getAge from "../services/get-age";

interface Props {
  author: Author;
}

const AuthorInfo = ({ author }: Props) => {
  return (
    <VStack paddingTop={10} spacing={4} align="stretch">
      <Heading as="h2" size="md">
        Personal Info
      </Heading>
      <Box h="40px">
        <Text fontSize="md" fontWeight="bold">
          Email
        </Text>
        <Text fontSize="md">{author.email}</Text>
      </Box>
      <Box h="40px">
        <Text fontSize="md" fontWeight="bold">
          Phone
        </Text>
        <Text fontSize="md">{author.phone}</Text>
      </Box>
      <Box h="40px">
        <Text fontSize="md" fontWeight="bold">
          Birthday
        </Text>
        <HStack>
          <Text fontSize="md">{author.date_of_birth}</Text>
          <Text fontSize="md">{getAge(author.date_of_birth)}</Text>
        </HStack>
      </Box>
      <Box h="40px">
        <Text fontSize="md" fontWeight="bold">
          Address
        </Text>
        <Text fontSize="md">{author.address}</Text>
      </Box>
    </VStack>
  );
};

export default AuthorInfo;
