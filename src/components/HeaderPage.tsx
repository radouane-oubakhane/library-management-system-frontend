import { HStack, Heading, Input, Box } from "@chakra-ui/react"
import { FunctionComponent } from "react";
import SelectorButtons from "./SelectorButtons";

interface Props {
  title: string;
  button?: boolean;
  ButtonComponent: FunctionComponent;
  searching?: boolean;
  searchTerm?: string;
  setSearchTerm?: (searchTerm: string) => void;
  filtering?: boolean;
  filters?: { name: string; value: string, color: string }[];
  setFilter?: (filter: string) => void;
}

const HeaderPage = ({ title, button, ButtonComponent, searching, searchTerm, setSearchTerm, filtering, filters, setFilter }: Props) => {
  return (
    <HStack spacing={10} justify="space-between" align="center" padding={"20px"}>
      <Heading>{title}</Heading>
     {
        searching && (
          <Box  flex={1}>
            <Input
             
              borderRadius={20}
              variant="filled"
              placeholder={"Search for a " + title}
              onChange={(event) => setSearchTerm!(event.target.value)}
              value={searchTerm}
            />
          </Box>
        )
     }
      {
        filtering && (
          <SelectorButtons filters={filters!} setFilter={setFilter!}/>
        )
      }
      {button && <ButtonComponent />}
      
    </HStack>
  )
}

export default HeaderPage


