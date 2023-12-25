import { Box, Heading, Text, Image, Tabs, TabList, Tab, TabPanels, TabPanel, Button } from '@chakra-ui/react';

import AuthorDetailPageSkeleton from "../components/AuthorDetailPageSkeleton";
import useProfileUser from "../hooks/profile/useUserProfile";

import BorrowTable from './BorrowTable';
import ReservationTable from './ReservationTable';
import EditProfileModal from '../components/EditProfileModal';

const ProfileUserPage = () => {
  const {
    data: profile,
    isLoading: authorIsLoading,
    error: authorError,
  } = useProfileUser();
  
  const handleDeleteProfile = () => {
    // Implement the logic to delete the user profile
    console.log(`Delete profile for user with ID ${id}`);
  };
  const handleUpdateProfile=()=>{

  }
  if (authorIsLoading) return <AuthorDetailPageSkeleton />;

  if (authorError)
    return (
      <Text fontSize="2xl" textAlign="center">
        {authorError.message}
      </Text>
    );
    const { id,first_name, last_name, email, phone, address, picture, reservation, borrow } = profile;

    console.log(profile)
    return (
        <Box p={4}>
          <Heading as="h2" size="xl" mb={4}>
            {first_name} {last_name}
          </Heading>
          <Image src={picture} alt={`${first_name} ${last_name}`} borderRadius="full" boxSize="150px" mb={4} />
    
          <Text>Email: {email}</Text>
          <Text>Phone: {phone}</Text>
          <Text>Address: {address}</Text>
          <Button onClick={handleUpdateProfile} colorScheme="blue" mt={4} mr={2}>
        <EditProfileModal profile={profile}/>
      </Button>
      <Button colorScheme="red" mt={4} onClick={handleDeleteProfile}>
        Delete Profile
      </Button>
          <Tabs mt={8} >
        <TabList>
          <Tab>Reservations</Tab>
          <Tab>Borrowed Books</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading as="h3" size="lg" mt={4} mb={2}>
              Reservations
            </Heading>
            <ReservationTable reservations={reservation} />
          </TabPanel>
          <TabPanel>
            <Heading as="h3" size="lg" mt={4} mb={2}>
              Borrowed Books
            </Heading>
            <BorrowTable borrows={borrow} />
          </TabPanel>
        </TabPanels>
      </Tabs>
        </Box>
      );
};


export default ProfileUserPage;
