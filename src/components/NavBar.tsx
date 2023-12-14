import { HStack, Hide, Text, Show } from "@chakra-ui/react";
import CategorySelector from "./CategorySelector";
import useCategories from "../hooks/useCategories";


const NavBar = () => {
  const { data: categories, error } = useCategories();

  if (error) {
    return null
  }


  return (
    <HStack justifyContent="space-between" padding="10px">
        <Text>Logo</Text>
        <CategorySelector categories={categories} />
    
        
    </HStack>
  );
};

export default NavBar;
