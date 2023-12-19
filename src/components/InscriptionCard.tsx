import { Button, Card, CardBody, CardFooter, HStack, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react"
import Inscription from "../models/Inscription"
import useDeleteInscription from "../hooks/inscription/useDeleteInscription"
import useAcceptInscription from "../hooks/inscription/useAcceptInscription"
import useRejectInscription from "../hooks/inscription/useRejectInscription"


interface Props {
  inscription: Inscription
}
const InscriptionCard = ({ inscription }: Props) => {
  const {mutate: deleteInscription, isLoading: deleteLoading} = useDeleteInscription();
  const {mutate: acceptInscription, isLoading: acceptLoading} = useAcceptInscription();
  const {mutate: rejectInscription, isLoading: rejectLoading} = useRejectInscription();
  return (
    <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://bit.ly/dan-abramov'
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>{inscription.first_name} {inscription.last_name}</Heading>

      <VStack align='start' mt={5} spacing={3}>
        <HStack spacing={1}>
          <Heading size='sm'>Email :</Heading>
          <Text>
            {inscription.email}
          </Text>
        </HStack>
        <HStack spacing={1}>
          <Heading size='sm'>Phone :</Heading>
          <Text>
            {inscription.phone}
          </Text>
        </HStack>
        <HStack spacing={1}>
          <Heading size='sm'>Address :</Heading>
          <Text>
            {inscription.address}
          </Text>
        </HStack>
      </VStack>
    </CardBody>

    <CardFooter>
      {(inscription.status === 'pending' || inscription.status === 'rejected') &&
        <Button variant='solid' colorScheme='whatsapp' mr={3}
        onClick={() => acceptInscription(inscription)}
        disabled={acceptLoading}
        >
          {acceptLoading ? 'Loading...' : 'Accept'}
        </Button>
      }
      {
        inscription.status === 'pending' &&
        <Button variant='solid' colorScheme='yellow' mr={3}
        onClick={() => rejectInscription(inscription)}
        disabled={rejectLoading}
        >
        {rejectLoading ? 'Loading...' : 'Reject'}
      </Button>
      }
      
      <Button variant='solid' colorScheme='red'
      onClick={() => deleteInscription(inscription)}
      disabled={deleteLoading}
      
      >
        {deleteLoading ? 'Loading...' : 'Delete'}
      </Button>
    </CardFooter>
  </Stack>
</Card>
  )
}

export default InscriptionCard