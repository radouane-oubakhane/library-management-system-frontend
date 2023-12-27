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
import useDeleteAuthor from "../hooks/author/useDeleteAuthor";
import EditAuthorModal from "./EditAuthorMadel";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {
  author: Author;
}

const AuthorCard = ({ author }: Props) => {
  const {mutate, isLoading} = useDeleteAuthor();
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={`http://127.0.0.1:8000/storage/authors/${author.picture}`}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          _hover={{
            transform: "scale(1.03)",
            transition: "transform 0.15s ease-in-out",
          }}
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
        <EditAuthorModal author={author} />
        <Button variant="solid" colorScheme="red" w="100%" leftIcon={<DeleteIcon />}
        onClick={() => mutate(author)}
        isLoading={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </HStack>
    </Card>
  );
};

export default AuthorCard;
