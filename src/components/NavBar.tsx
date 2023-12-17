import {
  Avatar,
  Button,
  Divider,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import useAuthors from "../hooks/useAuthors";
import useCategories from "../hooks/useCategories";
import AuthorSelector from "./AuthorSelector";
import CategorySelector from "./CategorySelector";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { data: categories, error: categoryError } = useCategories();
  const { data: authors, error: authorError } = useAuthors();

  if (categoryError && authorError) {
    return null;
  }

  return (
    <>
    <HStack justifyContent="space-between" padding="20px">
      <HStack justifyContent="space-between" spacing={10}>
        <Link to="/">
          <Text>Logo</Text>
        </Link>
        <CategorySelector categories={categories} />
        <AuthorSelector authors={authors} />
        <Link to="/inscriptions">
          <Heading as="b" size="sm" whiteSpace="nowrap">Inscriptions</Heading>
        </Link>
        <Link to="/categories">
          <Heading as="b" size="sm" whiteSpace="nowrap">Categories</Heading>
        </Link>
        <Link to="/books">
          <Heading as="b" size="sm" whiteSpace="nowrap">Books</Heading>
        </Link>
        <Link to="/authors">
          <Heading as="b" size="sm" whiteSpace="nowrap">Authors</Heading>
        </Link>
      </HStack>
      <Spacer />

      <HStack justifyContent="space-between" spacing={4}>
        <ColorModeSwitch />
        <Menu>
          <MenuButton>
            <Heading as="b" size="sm" whiteSpace="nowrap">
              <Button colorScheme="gray">Radouane</Button>
            </Heading>
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Sign Up</MenuItem>
            <MenuItem>Sign In</MenuItem>
            <MenuItem>Sign Out</MenuItem>
          </MenuList>
        </Menu>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      </HStack>
    </HStack>
    <Divider orientation="horizontal"/>
    </>
  );
};

export default NavBar;
