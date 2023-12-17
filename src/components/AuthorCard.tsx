import {
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Heading,
  Image,
  Stack,
  Text
} from "@chakra-ui/react";
import Author from "../models/Author";
import { Link } from "react-router-dom";

interface Props {
  author: Author;
}

const AuthorCard = ({ author }: Props) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="https://bit.ly/dan-abramov"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Link to={`/authors/${author.id}`}>
          <Heading size="md" _hover={{ color: "blue.400" }}>
            {author.first_name} {author.last_name}
          </Heading>
          </Link>
          <Text>{author.biography}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <HStack justifyContent="space-between" spacing={4} p={4}>
        <Button variant="solid" colorScheme="whatsapp" w="100%">
          Edit
        </Button>
        <Button variant="solid" colorScheme="red" w="100%">
          Delete
        </Button>
      </HStack>
    </Card>
  );
};

export default AuthorCard;