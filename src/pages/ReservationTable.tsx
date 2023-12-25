import { Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';

const ReservationTable = ({ reservations }:any) => {
  return (
    <Table variant="striped" colorScheme="teal" size="sm">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Status</Th>
          {/* Ajoutez d'autres colonnes au besoin */}
        </Tr>
      </Thead>
      <Tbody>
        {reservations.map((reservation:any) => (
          <Tr key={reservation.id}>
            <Td>{reservation.book.title}</Td>
            <Td>
              <Badge colorScheme={getStatusColor(reservation.status)}>{reservation.status}</Badge>
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

export default ReservationTable;
