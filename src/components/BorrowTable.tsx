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
} from "@chakra-ui/react";
import BookModal from "./BookModal";
import MemberModal from "./MemberModal";
import Borrow from "../models/Borrow";

interface Props {
  borrows?: Borrow[];
  isLoading: boolean;
  error: Error | null;
}

const BorrowTable = ({ borrows, isLoading, error }: Props) => {
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
            </Tr>
          </Thead>
          <Tbody>
            {borrows?.map((borrow) => (
              <Tr key={borrow.id}>
                <Td>
                  <MemberModal member={borrow.member} />
                </Td>
                <Td><BookModal book={borrow.book} /></Td>
                <Td>{borrow.borrow_date}</Td>
                <Td color={statusColor(borrow.status)}>
                  {borrow.status}
                </Td>
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
