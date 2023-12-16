import { Heading, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import Category from "../models/Category"

interface Props {
    categories?: Category[]
}


const CategorySelector = ({ categories }: Props) => {
  return (
    <Menu>
      <MenuButton>
        <Heading as="b" size="sm" whiteSpace="nowrap">
          Categories
        </Heading>
      </MenuButton>
      <MenuList>
        {categories?.map((category, index) => (
            <MenuItem key={index} textTransform="capitalize">{category.name}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default CategorySelector