import { Heading, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import Category from "../models/Category"
import { Link } from "react-router-dom"
import useAuth from "../hooks/auth/useAuth"

interface Props {
    categories?: Category[]
}


const CategorySelector = ({ categories }: Props) => {
  const {user} = useAuth();
  return (
    <Menu>
      <MenuButton>
        <Heading as="b" size="sm" whiteSpace="nowrap">
          {user?.is_admin ? "Books by category" : "Categories"}
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