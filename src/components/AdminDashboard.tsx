import {
  Button,
  HStack,
  Heading,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import useAdminProfile from "../hooks/admin/useAdminProfile";
import Inscription from "../models/Inscription";
import { useState } from "react";
import HeaderPage from "./HeaderPage";
import InscriptionCategoryCardContainer from "./InscriptionCategoryCardContainer";
import InscriptionCategoryCardSkeleton from "./InscriptionCategoryCardSkeleton";
import InscriptionCard from "./InscriptionCard";

const AdminDashboard = () => {
  const { data, error, isLoading } = useAdminProfile();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInscriptions = searchTerm
    ? data?.inscriptions?.filter(
        (inscription: Inscription) =>
          inscription.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          inscription.last_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          inscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inscription.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inscription.address
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))

    : data?.inscriptions;

  if (error)
    return (
      <Text fontSize="2xl" textAlign="center">
        {error.message}
      </Text>
    );

  const skeletons = Array(12).fill(0);
  return (
    <>
      <HeaderPage title="Dashboard" ButtonComponent={Button} />
      <HStack p="20px">
        <Stat border="1px solid" borderRadius="lg" p={10}>
          <StatLabel>
            <Heading size="md" mb={2}>
              Books Count
            </Heading>
          </StatLabel>
          <StatNumber>
            <Heading size="lg" mb={2}>
              {data?.dashboardData?.booksCount}
            </Heading>
          </StatNumber>
          <StatHelpText>Number of books in the library</StatHelpText>
        </Stat>

        <Stat border="1px solid" borderRadius="lg" p={10}>
          <StatLabel>
            <Heading size="md" mb={2}>
              Authors Count
            </Heading>
          </StatLabel>
          <StatNumber>
            <Heading size="lg" mb={2}>
              {data?.dashboardData?.authorsCount}
            </Heading>
          </StatNumber>
          <StatHelpText>Number of authors in the library</StatHelpText>
        </Stat>

        <Stat border="1px solid" borderRadius="lg" p={10}>
          <StatLabel>
            <Heading size="md" mb={2}>
              Categories Count
            </Heading>
          </StatLabel>
          <StatNumber>
            <Heading size="lg" mb={2}>
              {data?.dashboardData?.categoriesCount}
            </Heading>
          </StatNumber>
          <StatHelpText>Number of categories in the library</StatHelpText>
        </Stat>

        <Stat border="1px solid" borderRadius="lg" p={10}>
          <StatLabel>
            <Heading size="md" mb={2}>
              Members Count
            </Heading>
          </StatLabel>
          <StatNumber>
            <Heading size="lg" mb={2}>
              {data?.dashboardData?.membersCount}
            </Heading>
          </StatNumber>
          <StatHelpText>Number of members in the library</StatHelpText>
        </Stat>

        <Stat border="1px solid" borderRadius="lg" p={10}>
          <StatLabel>
            <Heading size="md" mb={2}>
              Reservs Count
            </Heading>
          </StatLabel>
          <StatNumber>
            <Heading size="lg" mb={2}>
              {data?.dashboardData?.reservationsCount}
            </Heading>
          </StatNumber>
          <StatHelpText>Number of pending reservations in the library</StatHelpText>
        </Stat>

        <Stat border="1px solid" borderRadius="lg" p={10}>
          <StatLabel>
            <Heading size="md" mb={2}>
              Borrowed Count
            </Heading>
          </StatLabel>
          <StatNumber>
            <Heading size="lg" mb={2}>
              {data?.dashboardData?.borrowsCount}
            </Heading>
          </StatNumber>
          <StatHelpText>Number of books borrowed in the library</StatHelpText>
        </Stat>

        <Stat border="1px solid" borderRadius="lg" p={10}>
          <StatLabel>
            <Heading size="md" mb={2}>
              Inscriptions Count
            </Heading>
          </StatLabel>
          <StatNumber>
            <Heading size="lg" mb={2}>
              {data?.dashboardData?.inscriptionsCount}
            </Heading>
          </StatNumber>
          <StatHelpText>
            Number of pending inscriptions requests
          </StatHelpText>
        </Stat>
      </HStack>
      {filteredInscriptions?.length !== 0 && (
      <HeaderPage
        title="Inscriptions"
        ButtonComponent={Button}
        searching
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      )}
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

export default AdminDashboard;


