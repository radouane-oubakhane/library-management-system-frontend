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
    src='https://bit.ly/dan-abramov'
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
      <Button variant='solid' colorScheme='whatsapp' mr={3}>
        Accept
      </Button>
      <Button variant='solid' colorScheme='yellow' mr={3}>
        Reject
      </Button>
      <Button variant='solid' colorScheme='red'>
        Delete
      </Button>
    </CardFooter>
  </Stack>
</Card>
  )
}

export default InscriptionCard