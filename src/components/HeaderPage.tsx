import { Button, HStack, Heading } from "@chakra-ui/react"

interface Props {
  title: string;
  button?: boolean;
  buttonTitle?: string;
}

const HeaderPage = ({ title, button, buttonTitle }: Props) => {
  return (
    <HStack spacing={4} justify="space-between" align="center" padding={"20px"}>
      <Heading>{title}</Heading>
      {button && <Button colorScheme="blue">{buttonTitle}</Button>}
    </HStack>
  )
}

export default HeaderPage


