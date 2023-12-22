import {
  Avatar,
  AvatarBadge,
  Button,
  Divider,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import useAuthors from "../hooks/author/useAuthors";
import useCategories from "../hooks/category/useCategories";
import AuthorSelector from "./AuthorSelector";
import CategorySelector from "./CategorySelector";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/auth/useAuth";

const NavBar = () => {
  const toast = useToast();
  const location = useLocation();
  const { data: categories, error: categoryError } = useCategories();
  const { data: authors, error: authorError } = useAuthors();
  const [selectedSection, setSelectedSection] = useState("");
  const {
    user,
    logout,
    loginLoading,
    logoutLoading,
    loginError,
    resetLoginError,
    logoutError,
    resetLogoutError,
    registerError,
    resetRegisterError,
  } = useAuth();
  const history = useNavigate();

  useEffect(() => {
    setSelectedSection(location.pathname.split("/")[1] || "home");
  }, [location.pathname]);

  if (categoryError && authorError) {
    return null;
  }

  const showLoginError = () => {
    if (loginError || logoutError || registerError) {
      toast({
        title: "An error occurred.",
        description: loginError,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      resetLoginError();
      resetLogoutError();
      resetRegisterError();
    }
  };

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
          {user?.is_admin && (
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
          )}
          {user?.is_admin && (
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
          )}
          {user?.is_admin && (
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
          )}
          {user?.is_admin && (
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
          )}
          {user?.is_admin && (
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
          )}
          {user?.is_admin && (
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
          )}
          {user?.is_admin && (
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
          )}
        </HStack>
        <Spacer />

        <HStack justifyContent="space-between" spacing={4}>
          <ColorModeSwitch />
          <Menu>
            
              <Heading as="b" size="sm" whiteSpace="nowrap">
                <Button colorScheme="gray" as={MenuButton}>
                  {user ? user.first_name + " " + user.last_name : "Guest"}
                </Button>
              </Heading>
            
            <MenuList>
              {user && <MenuItem>Profile</MenuItem>}
              {!user && (
                <MenuItem onClick={() => history("/login")}>Login</MenuItem>
              )}
              {!user && (
                <MenuItem onClick={() => history("/register")}>
                  Register
                </MenuItem>
              )}
              {user && (
                <MenuItem
                  onClick={() => {
                    logout();
                    history("/");
                  }}
                >
                  Logout
                </MenuItem>
              )}
            </MenuList>
          </Menu>
          {user && (
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
              {user?.is_admin && <AvatarBadge boxSize="1em" bg="green.500" />}
            </Avatar>
          )}
        </HStack>
      </HStack>
      {(!loginLoading || !logoutLoading) && (
        <Divider orientation="horizontal" />
      )}
      {(loginLoading || logoutLoading) && (
        <Skeleton startColor="pink.500" endColor="orange.500" height="4px" />
      )}

      {(loginError || registerError || logoutError) && showLoginError()}
    </>
  );
};

export default NavBar;
