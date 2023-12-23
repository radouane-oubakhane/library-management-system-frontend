import { VStack, Heading } from "@chakra-ui/react"
import SearchInput from "./SearchInput"

interface Props {
  setSearchTerm: (searchTerm: string) => void;
}


const DiscoveryHeader = ({ setSearchTerm }: Props) => {

  return (
    <VStack align='stretch' paddingX={16} spacing={0}>
        <Heading as='h2' size='2xl' paddingBottom={2} paddingTop={12}>Welcome.</Heading>
        <Heading as='h2' size='xl' mt={8} >Millions of books, and more.</Heading>
        <SearchInput setSearchTerm={setSearchTerm} />
    </VStack>
  )
}

export default DiscoveryHeader