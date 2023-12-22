import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Book from "../models/Book";
import useAddReservation from "../hooks/reservation/useAddReservation";
import useAuth from "../hooks/auth/useAuth";
import ReservationRequest from "../models/ReservationRequest";
import { useNavigate } from "react-router-dom";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  const { mutate } = useAddReservation();
  const { user } = useAuth();
  const history = useNavigate();
  return (
    <VStack spacing={4} align="stretch">
      <Image
        _hover={{
          transform: "scale(1.03)",
          transition: "transform 0.15s ease-in-out",
        }}
        boxShadow="md"
        borderRadius={10}
        overflow="hidden"
        src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781421577449/vagabond-vol-37-9781421577449_hr.jpg"
        alt={`${book.title} image`}
      />

      <Box>
        <VStack align="stretch">
          <Heading
            fontSize="1xl"
            textAlign="start"
            _hover={{ color: "blue.400" }}
          >
            {book.title}
          </Heading>
          <HStack justifyContent="space-between">
            <Text as="abbr" textAlign="start">
              {book.author_first_name} {book.author_last_name}
            </Text>
            <Badge variant="solid" colorScheme="purple">
              {book.category?.name}
            </Badge>
          </HStack>
        </VStack>
        <Button
          onClick={() => {
            if (user) {
              const date = new Date();
              const formattedDate = date.toISOString().split("T")[0];
              mutate({
                member_id: user.member_id,
                book_id: book.id,
                reserved_at: formattedDate,
              } as ReservationRequest);
            } else {
              history("/login");
            }
          }}
          variant="solid"
          colorScheme="whatsapp"
          w="100%"
          mt={2}
        >
          Reserve
        </Button>
      </Box>
    </VStack>
  );
};

export default BookCard;
