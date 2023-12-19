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
import useAuthors from "../hooks/author/useAuthors";
import useCategories from "../hooks/category/useCategories";
import AuthorSelector from "./AuthorSelector";
import CategorySelector from "./CategorySelector";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
  const location = useLocation();
  const { data: categories, error: categoryError } = useCategories();
  const { data: authors, error: authorError } = useAuthors();
  const [selectedSection, setSelectedSection] = useState("");


  useEffect(() => {
    
    setSelectedSection(location.pathname.split("/")[1] || "home");
  }, [location.pathname]);


 

  if (categoryError && authorError) {
    return null;
  }

  return (
    <>
      <HStack justifyContent="space-between" padding="20px">
        <HStack justifyContent="space-between" spacing={10}>
          <Link to="/">
          <Heading
              as="b"
              size="sm"
              whiteSpace="nowrap"
              fontFamily="cursive"
              onClick={() => setSelectedSection("home")}
              textColor={selectedSection === "home" ? "Fuchsia" : ""}
            >
              R-Library
            </Heading>
          </Link>
          <CategorySelector categories={categories} />
          <AuthorSelector authors={authors} />
          <Link to="/inscriptions">
            <Heading
              as="b"
              size="sm"
              whiteSpace="nowrap"
              onClick={() => setSelectedSection("inscriptions")}
              textColor={selectedSection === "inscriptions" ? "blue.500" : ""}
            >
              Inscriptions
            </Heading>
          </Link>
          <Link to="/categories">
            <Heading
              as="b"
              size="sm"
              whiteSpace="nowrap"
              onClick={() => setSelectedSection("categories")}
              textColor={selectedSection === "categories" ? "blue.500" : ""}
            >
              Categories
            </Heading>
          </Link>
          <Link to="/books">
            <Heading
              as="b"
              size="sm"
              whiteSpace="nowrap"
              onClick={() => setSelectedSection("books")}
              textColor={selectedSection === "books" ? "blue.500" : ""}
            >
              Books
            </Heading>
          </Link>
          <Link to="/authors">
            <Heading
              as="b"
              size="sm"
              whiteSpace="nowrap"
              onClick={() => setSelectedSection("authors")}
              textColor={selectedSection === "authors" ? "blue.500" : ""}
            >
              Authors
            </Heading>
          </Link>
          <Link to="/members">
            <Heading
              as="b"
              size="sm"
              whiteSpace="nowrap"
              onClick={() => setSelectedSection("members")}
              textColor={selectedSection === "members" ? "blue.500" : ""}
            >
              Members
            </Heading>
          </Link>
          <Link to="/reservations">
            <Heading
              as="b"
              size="sm"
              whiteSpace="nowrap"
              onClick={() => setSelectedSection("reservations")}
              textColor={selectedSection === "reservations" ? "blue.500" : ""}
            >
              Reservations
            </Heading>
          </Link>
          <Link to="/borrows">
            <Heading
              as="b"
              size="sm"
              whiteSpace="nowrap"
              onClick={() => setSelectedSection("borrows")}
              textColor={selectedSection === "borrows" ? "blue.500" : ""}
            >
              Borrows
            </Heading>
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
      <Divider orientation="horizontal" />
    </>
  );
};

export default NavBar;
