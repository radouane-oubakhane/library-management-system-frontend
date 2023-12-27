import {
  Box,
  Heading,
  Text,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  HStack,
} from "@chakra-ui/react";

import AuthorDetailPageSkeleton from "../components/AuthorDetailPageSkeleton";
import useProfileUser from "../hooks/userProfile/useUserProfile";

import BorrowTable from "../components/BorrowTable";
import ReservationTable from "../components/ReservationTable";
import { Link } from "react-router-dom";
import HeaderPage from "../components/HeaderPage";
import useMemberProfile from "../hooks/profile/useMemberProfile";
import EditProfileModal from "../components/EditProfileMadel";

const ProfileUserPage = () => {
  const {
    data: profile,
    isLoading: authorIsLoading,
    error: authorError,
  } = useMemberProfile();

  const handleDeleteProfile = () => {
    // Implement the logic to delete the user profile
    console.log(`Delete profile for user with ID ${id}`);
  };
  const handleUpdateProfile = () => {};
  if (authorIsLoading) return <AuthorDetailPageSkeleton />;

  if (authorError)
    return (
      <Text fontSize="2xl" textAlign="center">
        {authorError.message}
      </Text>
    );
  const {
    id,
    first_name,
    last_name,
    email,
    phone,
    address,
    picture,
    reservation,
    borrow,
  } = profile;

  return (
    <>
      <HeaderPage title="Member Profile Details" ButtonComponent={Button} />
      <HStack
        spacing={10}
        justify="space-between"
        align="start"
        padding={"20px"}
        borderRadius={10}
        boxShadow="lg"
        m="20px"
      >
        <Box flex={1}>
          <Image
            src={`http://127.0.0.1:8000/storage/members/${profile?.picture}`}
            alt={`${profile?.first_name} ${profile?.last_name}`}
            borderRadius="full"
            boxSize="150px"
            mb={6}
          />
          <Heading size="lg" mb={2}>
            {profile?.first_name} {profile?.last_name}
          </Heading>
          <HStack spacing={1} mb={2}>
            <Heading size="sm">Email :</Heading>
            <Text>{profile?.email}</Text>
          </HStack>
          <HStack spacing={1} mb={2}>
            <Heading size="sm">Phone :</Heading>
            <Text>{profile?.phone}</Text>
          </HStack>
          <HStack spacing={1} mb={2}>
            <Heading size="sm">Address :</Heading>
            <Text>{profile?.address}</Text>
          </HStack>
          <HStack spacing={1} mb={2}>
            <Heading size="sm">Date of Birth :</Heading>
            <Text>{profile?.date_of_birth}</Text>
          </HStack>
          <HStack spacing={1} mb={2}>
            <Heading size="sm">Membership start date :</Heading>
            <Text>{profile?.membership_start_date}</Text>
          </HStack>
          <HStack spacing={1}>
            <Heading size="sm">Membership end date :</Heading>
            <Text>{profile?.membership_end_date}</Text>
          </HStack>
        </Box>
        <Box>
          <EditProfileModal profile={profile} />
        </Box>
      </HStack>
      <Tabs mt={8}>
        <TabList>
          <Tab>Reservations</Tab>
          <Tab>Borrowed Books</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            
            <ReservationTable />
          </TabPanel>
          <TabPanel>
           
            <BorrowTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ProfileUserPage;
