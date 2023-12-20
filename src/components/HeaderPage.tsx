import { HStack, Heading } from "@chakra-ui/react"
import { FunctionComponent } from "react";

interface Props {
  title: string;
  button?: boolean;
  ButtonComponent: FunctionComponent;
}

const HeaderPage = ({ title, button, ButtonComponent }: Props) => {
  return (
    <HStack spacing={4} justify="space-between" align="center" padding={"20px"}>
      <Heading>{title}</Heading>
      {button && <ButtonComponent />}
    </HStack>
  )
}

export default HeaderPage


