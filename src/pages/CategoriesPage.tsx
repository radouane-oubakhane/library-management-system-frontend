import { SimpleGrid, Text } from "@chakra-ui/react";
import CategoryCard from "../components/categoryCard";
import useCategories from "../hooks/category/useCategories";
import InscriptionCategoryCardContainer from "../components/InscriptionCategoryCardContainer";
import InscriptionCategoryCardSkeleton from "../components/InscriptionCategoryCardSkeleton";
import HeaderPage from "../components/HeaderPage";

const CategoriesPage = () => {
  const { data: categories, isLoading, error } = useCategories();

  if (error)
    return (
      <Text fontSize="2xl" textAlign="center">
        {error.message}
      </Text>
    );

  const skeletons = Array(12).fill(0);

  return (
    <>
    <HeaderPage title="Categories" button buttonTitle="Add New Category" />
    <SimpleGrid columns={{md: 1, lg: 2, xl: 3 }} spacing={10} padding="20px">
      {isLoading &&
        skeletons.map((_, index) => (
          <InscriptionCategoryCardContainer key={index}>
            <InscriptionCategoryCardSkeleton />
          </InscriptionCategoryCardContainer>
        ))}

      {categories?.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </SimpleGrid>
    </>
  );
};

export default CategoriesPage;


