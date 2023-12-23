import { HStack, Heading, Input, Box } from "@chakra-ui/react"
import { FunctionComponent } from "react";

interface Props {
  title: string;
  button?: boolean;
  ButtonComponent: FunctionComponent;
  searching?: boolean;
  setSearchTerm: (searchTerm: string) => void;
}

const HeaderPage = ({ title, button, ButtonComponent, searching, setSearchTerm }: Props) => {
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
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </Box>
        )
     }
      {button && <ButtonComponent />}
    </HStack>
  )
}

export default HeaderPage


