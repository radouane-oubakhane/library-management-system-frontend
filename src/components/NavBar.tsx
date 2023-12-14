import { HStack, Hide, Text, Show } from "@chakra-ui/react";
import CategorySelector from "./CategorySelector";
import useCategories from "../hooks/useCategories";
import AuthorSelector from "./AuthorSelector";
import useAuthors from "../hooks/useAuthors";


const NavBar = () => {
  const { data: categories, error: categoryError } = useCategories();
  const { data: authors, error: authorError } = useAuthors();

  if (categoryError && authorError) {
    return null
  }


  return (
    <HStack justifyContent="space-between" padding="10px">
      <HStack justifyContent="space-between" spacing={10}>
        <Text>Logo</Text>
        <CategorySelector categories={categories} />
        <AuthorSelector authors={authors} />
    
        
      </HStack>
    </HStack>
  );
};

export default NavBar;
