import { SimpleGrid, Text } from "@chakra-ui/react";
import useInscriptions from "../hooks/useInscriptions";
import InscriptionCard from "../components/InscriptionCard";
import InscriptionCardSkeleton from "../components/InscriptionCardSkeleton";
import InscriptionCardContainer from "../components/InscriptionCardContainer";

const InscriptionsPage = () => {
  const {data: Inscriptions, isLoading, error} = useInscriptions();

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
          <InscriptionCardContainer key={index}>
          <InscriptionCardSkeleton/>
          </InscriptionCardContainer>
        ))
    }

    {
      Inscriptions?.map(Inscription => (
        <InscriptionCard key={Inscription.id} Inscription={Inscription} />
      ))
    }
      
    </SimpleGrid>
  );
};

export default InscriptionsPage;
