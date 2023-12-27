import { VStack, Heading, Box } from "@chakra-ui/react"
import SearchInput from "./SearchInput"

interface Props {
  setSearchTerm: (searchTerm: string) => void;
}


const DiscoveryHeader = ({ setSearchTerm }: Props) => {


  return (
    <Box
    bgImage="public/cat2.jpg"
    bgSize="cover"
    bgPosition="center"
    >

    
    <VStack align='stretch' paddingX={16} spacing={0} >
        <Heading as='h2' size='2xl' paddingBottom={2} paddingTop={12} color='white' >Discover your next great book</Heading>
        <Heading as='h2' size='xl' mt={8} color='white' >Search by title, author, or category</Heading>
        <SearchInput setSearchTerm={setSearchTerm} />
    </VStack>
    </Box>
  )
}

export default DiscoveryHeader