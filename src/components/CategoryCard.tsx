import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react"
import Category from "../models/Category"
import useDeleteCategory from "../hooks/useDeleteCategory"


interface Props {
  category: Category
}
const CategoryCard = ({ category }: Props) => {
  const { mutate } = useDeleteCategory(category.id.toString())
  return (
    <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://www.eecs.mit.edu/wp-content/uploads/2021/06/compscihero-1024x545.jpg'
    alt={category.name + ' picture'}
  />

  <Stack>
    <CardBody>
      <Heading size='md'>{category.name}</Heading>
      <Text>{category.description}</Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='whatsapp' mr={3}>
        Edit
      </Button>
      <Button variant='solid' colorScheme='red'
      onClick={() => mutate(category)}
      >
        Delete
      </Button>
    </CardFooter>
  </Stack>
</Card>
  )
}

export default CategoryCard