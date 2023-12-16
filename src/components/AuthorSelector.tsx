import {
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import Author from "../models/Author";
import { Link } from "react-router-dom";

interface Props {
  authors?: Author[];
}

const AuthorSelector = ({ authors }: Props) => {
  return (
    <Menu>
      <MenuButton>
        <Heading as="b" size="sm" whiteSpace="nowrap">
          Authors
        </Heading>
      </MenuButton>
      <MenuList>
        {authors?.map((author, index) => (
          <Link to={`/authors/${author.id}`} key={index}>
            <MenuItem key={index} textTransform="capitalize">
              {author.first_name} {author.last_name}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
};

export default AuthorSelector;
