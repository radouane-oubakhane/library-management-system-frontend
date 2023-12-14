import { Heading, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"

import { Author } from "../models/Author"


 interface Props {
  authors?: Author[];
}



const AuthorSelector = ({ authors}: Props) => {
  return (
    <Menu>
      <MenuButton>
        <Heading as="b" size="sm" whiteSpace="nowrap">
          Book Authors
        </Heading>
      </MenuButton>
      <MenuList>
        {authors?.map((author, index) => (
            <MenuItem key={index} textTransform="capitalize">{author.first_name} {author.last_name}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default AuthorSelector