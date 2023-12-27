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
import useMemberProfile from "../hooks/profile/useMemberProfile";
import Borrow from "../models/Borrow";
import BookModal from "./BookModal";
import HeaderPage from "./HeaderPage";

const BorrowTable = () => {
  const {
    data: memberProfile,
    isLoading: isLoadingProfile,
    error: errorProfile,
  } = useMemberProfile();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  let filteredBorrows: Borrow[] | undefined = [];

  const filters = [
    { name: "borrowed", value: "borrowed", color: "yellow" },
    { name: "returned", value: "returned", color: "green" },
    { name: "overdue", value: "overdue", color: "red" },
    { name: "Clear", value: "", color: "gray" },
  ];

  if (filter === "" && searchTerm === "") {
    filteredBorrows = memberProfile?.borrow;
  } else if (filter !== "" && searchTerm === "") {
    filteredBorrows = memberProfile?.borrow?.filter(
      (borrow) => borrow.status === filter
    );
  } else if (filter === "" && searchTerm !== "") {
    filteredBorrows = memberProfile?.borrow?.filter((borrow) =>
      borrow.book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    filteredBorrows = memberProfile?.borrow?.filter(
      (borrow) =>
        borrow.status === filter &&
        borrow.book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const onSelectedFilter = (filter: string) => {
    setFilter(filter);
    if (filter === "") {
      setSearchTerm("");
    }
  };

  if (errorProfile)
    return (
      <Text fontSize="2xl" textAlign="center">
        {errorProfile.message}
      </Text>
    );

  const skeletons = Array(20).fill(0);

  const statusColor = (status: string) => {
    if (status === "overdue") {
      return "red.400";
    } else if (status === "borrowed") {
      return "blue.500";
    } else {
      return "green.400";
    }
  };
  return (
    <Box py="20px">
      <HeaderPage
        title="Borrows"
        ButtonComponent={Button}
        searching
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        filtering
        filters={filters}
        setFilter={onSelectedFilter}
      />
      {isLoadingProfile && (
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
              <Th>Book</Th>
              <Th>Borrowed Date</Th>
              <Th>Status</Th>
              <Th>return Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBorrows?.map((borrow) => (
              <Tr key={borrow.id}>
                <Td>
                  <BookModal book={borrow.book} />
                </Td>
                <Td>{borrow.borrow_date}</Td>
                <Td color={statusColor(borrow.status)}>{borrow.status}</Td>
                <Td color={borrow.return_date ? "red.400" : "green.400"}>
                  {borrow.return_date || "Not Canceled"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BorrowTable;
