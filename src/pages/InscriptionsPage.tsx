import { Button, SimpleGrid, Text } from "@chakra-ui/react";
import useInscriptions from "../hooks/inscription/useInscriptions";
import InscriptionCard from "../components/InscriptionCard";
import InscriptionCategoryCardSkeleton from "../components/InscriptionCategoryCardSkeleton";
import InscriptionCategoryCardContainer from "../components/InscriptionCategoryCardContainer";
import HeaderPage from "../components/HeaderPage";
import { useState } from "react";
import Inscription from "../models/Inscription";

const InscriptionsPage = () => {
  const { data: inscriptions, isLoading, error } = useInscriptions();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  let filteredInscriptions: Inscription[] | undefined = [];


  const filters = [
    { name: "Pending", value: "pending", color: "yellow" },
    { name: "Accepted", value: "accepted", color: "green" },
    { name: "Rejected", value: "rejected", color: "red" },
    { name: "Clear", value: "", color: "gray" },
  ];

  if (filter === "" && searchTerm === "") {
    filteredInscriptions = inscriptions;
  } else if (filter !== "" && searchTerm === "") {
    filteredInscriptions = inscriptions?.filter(
      (inscription) => inscription.status === filter
    );
  } else if (filter === "" && searchTerm !== "") {
    filteredInscriptions = inscriptions?.filter(
      (inscription) =>
        inscription.first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        inscription.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    filteredInscriptions = inscriptions?.filter(
      (inscription) =>
        inscription.status === filter &&
        (inscription.first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          inscription.last_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    );
  }


  const onSelectedFilter = (filter: string) => {
    setFilter(filter);
    if (filter === "") {
      setSearchTerm("");
    }
  }

  if (error)
    return (
      <Text fontSize="2xl" textAlign="center">
        {error.message}
      </Text>
    );

  const skeletons = Array(12).fill(0);
  return (
    <>
      <HeaderPage
        title="Inscriptions"
        ButtonComponent={Button}
        searching
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        filtering
        filters={filters}
        setFilter={onSelectedFilter}
      />
      <SimpleGrid columns={{ lg: 1, xl: 2 }} spacing={10} padding="20px">
        {isLoading &&
          skeletons.map((_, index) => (
            <InscriptionCategoryCardContainer key={index}>
              <InscriptionCategoryCardSkeleton />
            </InscriptionCategoryCardContainer>
          ))}

        {filteredInscriptions?.map((Inscription) => (
          <InscriptionCard key={Inscription.id} inscription={Inscription} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default InscriptionsPage;



