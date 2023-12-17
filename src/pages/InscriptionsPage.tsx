import { SimpleGrid, Text } from "@chakra-ui/react";
import useInscriptions from "../hooks/useInscriptions";
import InscriptionCard from "../components/InscriptionCard";
import InscriptionCategoryCardSkeleton from "../components/InscriptionCategoryCardSkeleton";
import InscriptionCategoryCardContainer from "../components/InscriptionCategoryCardContainer";

const InscriptionsPage = () => {
  const {data: inscriptions, isLoading, error} = useInscriptions();

  if (error)
  return (
    <Text fontSize="2xl" textAlign="center">
      {error.message}
    </Text>
  );

  const skeletons = Array(12).fill(0);
  return (
    <SimpleGrid
    columns={{ lg: 1, xl:2 }}
    spacing={10}
    padding="20px"
  >

    {
      isLoading && 
        skeletons.map((_, index) => (
          <InscriptionCategoryCardContainer key={index}>
          <InscriptionCategoryCardSkeleton/>
          </InscriptionCategoryCardContainer>
        ))
    }

    {
      inscriptions?.map(Inscription => (
        <InscriptionCard key={Inscription.id} Inscription={Inscription} />
      ))
    }
      
    </SimpleGrid>
  );
};

export default InscriptionsPage;
