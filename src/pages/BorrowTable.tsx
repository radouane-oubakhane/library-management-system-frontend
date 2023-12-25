

import { Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';

const BorrowTable = ({ borrows }:any) => {
  return (
    <Table variant="striped" colorScheme="blue" size="sm">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Status</Th>
          {/* Ajoutez d'autres colonnes au besoin */}
        </Tr>
      </Thead>
      <Tbody>
        {borrows.map((borrow:any) => (
          <Tr key={borrow.id}>
            <Td>{borrow.book.title}</Td>
            <Td>
              <Badge colorScheme={getStatusColor(borrow.status)}>{borrow.status}</Badge>
            </Td>
            {/* Ajoutez d'autres colonnes au besoin */}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

const getStatusColor = (status:any) => {
    switch (status) {
      case 'canceled':
        return 'red';
      case 'borrowed':
        return 'blue';
      case 'reserved':
        return 'yellow';
      case 'expired':
        return 'gray';
      case 'returned':
        return 'green';
      default:
        return 'gray';
    }
  };

export default BorrowTable;
