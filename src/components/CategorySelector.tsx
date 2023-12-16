import { Heading, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import Category from "../models/Category"
import { Link } from "react-router-dom"

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
          <Link key={index} to={`/categories/${category.id}`}>
            <MenuItem key={index} textTransform="capitalize">{category.name}</MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  )
}

export default CategorySelector