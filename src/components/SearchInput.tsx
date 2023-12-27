import { Box, Input, useColorModeValue } from "@chakra-ui/react";
import { ChangeEvent, useRef } from "react";

interface Props {
  setSearchTerm: (searchTerm: string) => void;
}

const SearchInput = ({ setSearchTerm }: Props) => {
  const searchTermRef = useRef<HTMLInputElement>(null);
  const formBackground = useColorModeValue("white", "gray.800");


  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <Box paddingY={10} >
      <Input
      bg={formBackground} boxShadow={"2xl"}
      _focus={ {background: formBackground} }
      _hover={ {background: formBackground} }
        ref={searchTermRef}
        borderRadius={20}
        variant="filled"
        placeholder="Search for a book..."
        onChange={handleSearch}
      />
    </Box>
  );
};

export default SearchInput;


