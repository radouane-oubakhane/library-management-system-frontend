import { SimpleGrid, Text } from "@chakra-ui/react";
import Author from "../models/Author";
import AdminCardSkeleton from "./AdminCardSkeleton";
import AuthorCard from "./AuthorCard";
import CardContainer from "./CardContainer";

interface Props {
  authors?: Author[];
  isLoading: boolean;
  error: Error | null;
}

const AuthorGrid = ({ authors, isLoading, error }: Props) => {

    const skeletons = Array(12).fill(0);

    if (error)
    return (
      <Text fontSize="2xl" textAlign="center">
        {error.message}
      </Text>
    );


    return (
        <SimpleGrid
      columns={{ sm: 2, md: 3, lg: 4, xl: 6 }}
      spacing={10}
      padding="20px"
    >
      {isLoading &&
        skeletons.map((_, index) => (
          <CardContainer key={index}>
            <AdminCardSkeleton />
          </CardContainer>
        ))}
      {authors?.map((author, index) => (
        <CardContainer key={index}>
          <AuthorCard author={author} />
        </CardContainer>
      ))}
    </SimpleGrid>
    );
};

export default AuthorGrid;



