import { Button, Card, CardBody, CardFooter, HStack, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react"
import Inscription from "../models/Inscription"


interface Props {
  Inscription: Inscription
}
const InscriptionCard = ({ Inscription }: Props) => {
  return (
    <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>{Inscription.first_name} {Inscription.last_name}</Heading>

      <VStack align='start' mt={5} spacing={3}>
        <HStack spacing={1}>
          <Heading size='sm'>Email :</Heading>
          <Text>
            {Inscription.email}
          </Text>
        </HStack>
        <HStack spacing={1}>
          <Heading size='sm'>Phone :</Heading>
          <Text>
            {Inscription.phone}
          </Text>
        </HStack>
        <HStack spacing={1}>
          <Heading size='sm'>Address :</Heading>
          <Text>
            {Inscription.address}
          </Text>
        </HStack>
      </VStack>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue' mr={3}>
        Accept
      </Button>
      <Button variant='solid' colorScheme='red' mr={3}>
        Reject
      </Button>
    </CardFooter>
  </Stack>
</Card>
  )
}

export default InscriptionCard