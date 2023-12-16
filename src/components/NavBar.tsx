import { HStack, Spacer, Text } from "@chakra-ui/react";
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
    return null
  }


  return (
    <HStack justifyContent="space-between" padding="20px">
      <HStack justifyContent="space-between" spacing={10}>
        <Link to="/">
        <Text>Logo</Text>
        </Link>
        <CategorySelector categories={categories} />
        <AuthorSelector authors={authors} />
      </HStack>
      <Spacer />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
