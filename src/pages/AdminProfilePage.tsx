
import { Box, Heading, Text, Image, SimpleGrid} from '@chakra-ui/react';
import useAdmineProfile from '../hooks/profile/useAdmineProfile';
import AuthorDetailPageSkeleton from '../components/AuthorDetailPageSkeleton';



const AdminProfilePage = () => {
  const {
    data: profile,
    isLoading: authorIsLoading,
    error: authorError,
  } = useAdmineProfile();
  
 
  if (authorIsLoading) return <AuthorDetailPageSkeleton />;

  if (authorError)
    return (
      <Text fontSize="2xl" textAlign="center">
        {authorError.message}
      </Text>
    );
  const {
    
    first_name,
    last_name,
    email,
    phone,
    address,
    date_of_birth,
    membership_start_date,
    membership_end_date,
    picture,
    dashboardData,
  } = profile;

  
  return (
    <Box p={4}>
      <Heading as="h2" size="xl">
        User Details
      </Heading>
      <Image src={picture} alt={`${first_name} ${last_name}`} borderRadius="full" boxSize="150px" mt={4} />
      <Text mt={2}>{`${first_name} ${last_name}`}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone: {phone}</Text>
      <Text>Address: {address}</Text>
      <Text>Date of Birth: {date_of_birth}</Text>
      <Text>Membership Start Date: {membership_start_date}</Text>
      <Text>Membership End Date: {membership_end_date}</Text>

      

      <Heading as="h3" size="lg" mt={8}>
        Dashboard Data
      </Heading>
      <SimpleGrid columns={2} spacing={4} mt={2}>
        {Object.entries(dashboardData).map(([key, value]:any) => (
          <Box key={key} p={4} borderWidth="1px" borderRadius="lg">
            <Text fontWeight="bold">{key}</Text>
            <Text>{value}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AdminProfilePage;
