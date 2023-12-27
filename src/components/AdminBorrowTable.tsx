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
  WrapItem,
} from "@chakra-ui/react";
import BookModal from "./BookModal";
import MemberModal from "./MemberModal";
import Borrow from "../models/Borrow";
import useReturnedBorrow from "../hooks/borrow/useReturnedBorrow";
import useOverdueBorrow from "../hooks/borrow/useOverdueBorrow";
import useDeleteBorrow from "../hooks/borrow/useDeleteBorrow";
import useBorrows from "../hooks/borrow/useBorrows";
import { useState } from "react";
import HeaderPage from "./HeaderPage";
import { CheckIcon, DeleteIcon, WarningIcon } from "@chakra-ui/icons";



const AdminBorrowTable = () => {
  const { mutate: mutateReturnedBorrows } = useReturnedBorrow();
  const { mutate: mutateOverdueBorrows } = useOverdueBorrow();
  const {
    mutate: mutateDeleteBorrows,
  } = useDeleteBorrow();

  

  const { data: borrows, error, isLoading } = useBorrows();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  let filteredBorrows: Borrow[] | undefined = [];

  const filters = [
    { name: "borrowed", value: "borrowed", color: "yellow" },
    { name: "returned", value: "returned", color: "green" },
    { name: "overdue", value: "overdue", color: "red"},
    { name: "Clear", value: "", color: "gray" },
  ];

  if (filter === "" && searchTerm === "") {
    filteredBorrows = borrows;
  } else if (filter !== "" && searchTerm === "") {
    filteredBorrows = borrows?.filter(
      (borrow) => borrow.status === filter
    );
  } else if (filter === "" && searchTerm !== "") {
    filteredBorrows = borrows?.filter(
      (borrow) =>
        borrow.member.first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        borrow.member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        borrow.book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    filteredBorrows = borrows?.filter(
      (borrow) =>
        borrow.status === filter &&
        (borrow.member.first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          borrow.member.last_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          borrow.book.title.toLowerCase().includes(searchTerm.toLowerCase()))
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
              <Th>Borrowed Date</Th>
              <Th>Status</Th>
              <Th>return Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBorrows?.map((borrow) => (
              <Tr key={borrow.id}>
                <Td>
                  <MemberModal member={borrow.member} />
                </Td>
                <Td>
                  <BookModal book={borrow.book} admin />
                </Td>
                <Td>{borrow.borrow_date}</Td>
                <Td color={statusColor(borrow.status)}>{borrow.status}</Td>
                <Td color={borrow.return_date ? "red.400" : "green.400"}>
                  {borrow.return_date || "Not Canceled"}
                </Td>
                <Td>
                  <WrapItem>
                    {(borrow.status === "borrowed" ||
                      borrow.status === "overdue") && (
                      <Button leftIcon={<CheckIcon />}
                        mr={2}
                        onClick={() => mutateReturnedBorrows(borrow)}
                        colorScheme="green"
                      >
                        Returned
                      </Button>
                    )}
                    {borrow.status === "borrowed" && (
                      <Button leftIcon={<WarningIcon />}
                        onClick={() => mutateOverdueBorrows(borrow)}
                        colorScheme="gray"
                      >
                        Overdue
                      </Button>
                    )}
                    <Button leftIcon={<DeleteIcon />}
                      ml={2}
                      onClick={() => mutateDeleteBorrows(borrow)}
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                  </WrapItem>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminBorrowTable;


