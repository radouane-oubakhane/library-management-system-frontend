import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import Inscription from "../models/Inscription"

interface Props {
    inscriptions?: Inscription[]
    }


const InscriptionsTable = ({ inscriptions }: Props) => {
  return (
    <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <Thead>
      <Tr>
        <Th> first Name</Th>
        <Th>Last Name</Th>
        <Th>Phone</Th>
        <Th>Email</Th>
        <Th>Address</Th>
        <Th>Status</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        inscriptions?.map((inscription) => (
          <Tr key={inscription.id}>
            <Td>{inscription.first_name}</Td>
            <Td>{inscription.last_name}</Td>
            <Td>{inscription.phone}</Td>
            <Td>{inscription.email}</Td>
            <Td>{inscription.address}</Td>
            <Td>{inscription.status}</Td>
          </Tr>
        ))
      }
    </Tbody>
  </Table>
</TableContainer>
  )
}

export default InscriptionsTable