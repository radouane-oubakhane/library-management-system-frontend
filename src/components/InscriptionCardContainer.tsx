import { Card } from "@chakra-ui/react"



interface Props {
    children: React.ReactNode
}


const InscriptionCardContainer = ({ children }: Props) => {
  return (
    <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        boxShadow='md'
    >
        {children}
    </Card>
  )
}

export default InscriptionCardContainer