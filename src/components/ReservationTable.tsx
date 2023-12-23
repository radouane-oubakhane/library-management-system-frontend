import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import Reservation from "../models/Reservation";
import BookModal from "./BookModal";
import MemberModal from "./MemberModal";
import useDeleteReservation from "../hooks/reservation/useDeleteReservation";
import useBorrowReservation from "../hooks/reservation/useBorrowReservation";
import BorrowReservationModel from "./BorrowReservationModel";

interface Props {
  reservations?: Reservation[];
  isLoading: boolean;
  error: Error | null;
}

const ReservationTable = ({ reservations, isLoading, error }: Props) => {
  const { mutate: deleteReservation, isLoading: isDeleting } =
  useDeleteReservation();

const { mutate: borrowReservation, isLoading: isBorrowing } =
  useBorrowReservation();




  if (error)
    return (
      <Text fontSize="2xl" textAlign="center">
        {error.message}
      </Text>
    );

  const skeletons = Array(20).fill(0);

  const statusColor = (status: string) => {
    if (status === "canceled") {
      return "red.400";
    } else if (status === "expired") {
      return "orange.300";
    } else if (status === "reserved") {
      return "blue.500";
    } else {
      return "green.400";
    }
  };

  return (
    <Box py="20px">
      {isLoading && (
        <TableContainer>
          <Table variant="simple">
            <Tbody>
              {skeletons.map((_, index) => (
                <Tr key={index}>
                  <Td>
                    <Skeleton height="20px" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" />
                  </Td>
                  
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Member</Th>
              <Th>Book</Th>
              <Th>Reservation Date</Th>
              <Th>Expiration Date</Th>
              <Th>Status</Th>
              <Th>Cancellation Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reservations?.map((reservation) => (
              <Tr key={reservation.id}>
                <Td>
                  <MemberModal member={reservation.member} />
                </Td>
                <Td>
                  <BookModal book={reservation.book} />
                </Td>
                <Td>{reservation.reserved_at}</Td>
                <Td>{reservation.expired_at}</Td>
                <Td color={statusColor(reservation.status)}>
                  {reservation.status}
                </Td>
                <Td color={reservation.canceled_at ? "red.400" : "green.400"}>
                  {reservation.canceled_at || "Not Canceled"}
                </Td>
                <Td>
                  {reservation.status === "reserved" && (
                    <BorrowReservationModel reservation={reservation} key={reservation.id} />
                  )}

                  <Button colorScheme="red" 
                  onClick={() => {
                    deleteReservation(reservation);
                  }}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReservationTable;
