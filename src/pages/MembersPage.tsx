import { Button, SimpleGrid, Text } from "@chakra-ui/react";
import useMembers from "../hooks/member/useMembers"
import InscriptionCategoryCardContainer from "../components/InscriptionCategoryCardContainer";
import InscriptionCategoryCardSkeleton from "../components/InscriptionCategoryCardSkeleton";
import MemberCard from "../components/MemberCard";
import HeaderPage from "../components/HeaderPage";

const MembersPage = () => {
    const { data: members, isLoading, error } = useMembers();
    
    if (error)
  return (
    <Text fontSize="2xl" textAlign="center">
      {error.message}
    </Text>
  );

  const skeletons = Array(12).fill(0);
  return (
    <>
    <HeaderPage title="Members" ButtonComponent={Button} />
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
      members?.map(member => (
        <MemberCard key={member.id} member={member} />
      ))
    }
      
    </SimpleGrid>
    </>
  );
}

export default MembersPage


