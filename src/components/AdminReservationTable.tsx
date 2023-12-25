import {
  Box,
  Button,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import useBorrowReservation from "../hooks/reservation/useBorrowReservation";
import useDeleteReservation from "../hooks/reservation/useDeleteReservation";
import Reservation from "../models/Reservation";
import BookModal from "./BookModal";
import BorrowReservationModel from "./BorrowReservationModel";
import HeaderPage from "./HeaderPage";
import MemberModal from "./MemberModal";
import useBorrows from "../hooks/borrow/useBorrows";
import useReservations from "../hooks/reservation/useReservations";



const AdminReservationTable = () => {
  const { mutate: deleteReservation, isLoading: isDeleting } =
  useDeleteReservation();

const { mutate: borrowReservation, isLoading: isBorrowing } =
  useBorrowReservation();

  const {data: reservations, isLoading, error} = useReservations();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  let filteredReservations: Reservation[] | undefined = [];

  const filters = [
    { name: "reserved", value: "reserved", color: "yellow" },
    { name: "canceled", value: "canceled", color: "red" },
    { name: "expired", value: "expired", color: "blue" },
    { name: "borrowed", value: "borrowed", color: "green" },
    { name: "Clear", value: "", color: "gray" },
  ];


  if (filter === "" && searchTerm === "") {
    filteredReservations = reservations;
  } else if (filter !== "" && searchTerm === "") {
    filteredReservations = reservations?.filter(
      (reservation) => reservation.status === filter
    );
  }
    else if (filter === "" && searchTerm !== "") {
        filteredReservations = reservations?.filter(
        (reservation) =>
            reservation.member.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            reservation.member.last_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            reservation.book.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) 
        );
    } else {
        filteredReservations = reservations?.filter(
        (reservation) =>
            reservation.status === filter &&
            (reservation.member.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            reservation.member.last_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            reservation.book.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))

        );
    }


    const onSelectedFilter = (filter: string) => {
        setFilter(filter);
        if (filter === "") {
          setSearchTerm("");
        }
      }













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
      <HeaderPage
        title="Reservations"
        ButtonComponent={Button}
        searching
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        filtering
        filters={filters}
        setFilter={onSelectedFilter}
      />
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
            {filteredReservations?.map((reservation) => (
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

export default AdminReservationTable;
