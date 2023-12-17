import { SimpleGrid } from "@chakra-ui/react";
import useInscriptions from "../hooks/useInscriptions";
import InscriptionCard from "../components/InscriptionCard";

const InscriptionsPage = () => {
  const {data: Inscriptions, isLoading, error} = useInscriptions();
  return (
    <SimpleGrid
    columns={{ lg: 1, xl:2 }}
    spacing={10}
    padding="20px"
  >

    {
      Inscriptions?.map(Inscription => (
        <InscriptionCard key={Inscription.id} Inscription={Inscription} />
      ))
    }
      
    </SimpleGrid>
  );
};

export default InscriptionsPage;
