import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react"
import Category from "../models/Category"
import useDeleteCategory from "../hooks/category/useDeleteCategory"
import EditCategoryModal from "./EditCategoryMadel"
import { DeleteIcon } from "@chakra-ui/icons"


interface Props {
  category: Category
}
const CategoryCard = ({ category }: Props) => {
  const { mutate } = useDeleteCategory();
  return (
    <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={`http://127.0.0.1:8000/storage/categories/${category.picture}`}

    alt={category.name + ' picture'}
  />

  <Stack>
    <CardBody>
      <Heading size='md'>{category.name}</Heading>
      <Text>{category.description}</Text>
    </CardBody>

    <CardFooter>
      <EditCategoryModal category={category} />
      <Button variant='solid' colorScheme='red' leftIcon={<DeleteIcon />}
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