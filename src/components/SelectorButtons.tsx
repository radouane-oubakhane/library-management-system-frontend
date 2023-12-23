import { Wrap, WrapItem, Button } from "@chakra-ui/react"


interface Props {
  setFilter: (filter: string) => void;
  filters: { name: string; value: string, color: string }[];

}

const SelectorButtons = ({ setFilter, filters }: Props) => {
  return (
    <Wrap spacing={4}>
    {
      filters.map((filter) => (
        <WrapItem key={filter.value}>
          <Button
            colorScheme={filter.color}
            onClick={() => setFilter(filter.value)}
          >
            {filter.name}
          </Button>
        </WrapItem>
      ))
    }
  </Wrap>
  )
}

export default SelectorButtons