import { Box, Input } from "@chakra-ui/react";
import { ChangeEvent, useRef } from "react";

interface Props {
  setSearchTerm: (searchTerm: string) => void;
}

const SearchInput = ({ setSearchTerm }: Props) => {
  const searchTermRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <Box paddingY={10}>
      <Input
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


