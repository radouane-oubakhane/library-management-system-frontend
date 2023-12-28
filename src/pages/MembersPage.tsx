import { Button, SimpleGrid, Text } from "@chakra-ui/react";
import useMembers from "../hooks/member/useMembers"
import InscriptionCategoryCardContainer from "../components/InscriptionCategoryCardContainer";
import InscriptionCategoryCardSkeleton from "../components/InscriptionCategoryCardSkeleton";
import MemberCard from "../components/MemberCard";
import HeaderPage from "../components/HeaderPage";
import { useState } from "react";
import useAuth from "../hooks/auth/useAuth";

const MembersPage = () => {
    const { data: members, isLoading, error } = useMembers();
    const [searchTerm, setSearchTerm] = useState("");
    const {user} = useAuth();



    let filteredMembers = searchTerm === ""
    ? members
    : members?.filter(member => member.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) || member.last_name?.toLowerCase().includes(searchTerm.toLowerCase()));


    filteredMembers = filteredMembers?.filter(member => member.user_id !== user?.id);
    
    if (error)
  return (
    <Text fontSize="2xl" textAlign="center">
      {error.message}
    </Text>
  );

  const skeletons = Array(12).fill(0);
  return (
    <>
    <HeaderPage title="Members" ButtonComponent={Button} searching setSearchTerm={setSearchTerm}/>
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
      filteredMembers?.map(member => (
        <MemberCard key={member.id} member={member} />
      ))
    }
      
    </SimpleGrid>
    </>
  );
}

export default MembersPage


