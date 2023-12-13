import { HStack, Hide, Text, Show } from "@chakra-ui/react";


const NavBar = () => {

  return (
    <HStack justifyContent="space-between" padding="10px">
        <Text>Logo</Text>
        <Hide above="md">
            <Text>Menu</Text>
        </Hide>
        <Show above="md">
            <Text>Menu</Text>
        </Show>
    
        
    </HStack>
  );
};

export default NavBar;
