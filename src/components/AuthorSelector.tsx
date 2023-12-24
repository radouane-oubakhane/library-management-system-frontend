import {
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import Author from "../models/Author";
import { Link } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";

interface Props {
  authors?: Author[];
}

const AuthorSelector = ({ authors }: Props) => {
  const {user} = useAuth();
  return (
    <Menu>
      <MenuButton>
        <Heading as="b" size="sm" whiteSpace="nowrap">
         {user?.is_admin ? "Books by author" : "Authors"}
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
