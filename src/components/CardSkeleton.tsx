import {
  HStack,
  Skeleton,
  SkeletonText,
  VStack
} from "@chakra-ui/react";

const CardSkeleton = () => {
  return (
    <VStack spacing={4} align="stretch">
      <Skeleton borderRadius={10} overflow="hidden" h="400px" />
      <HStack justifyContent="space-between">
        <SkeletonText noOfLines={3} spacing="2" skeletonHeight="2" w="130px" />
        <Skeleton>
          <div>radouane</div>
        </Skeleton>
      </HStack>
    </VStack>
  );
};

export default CardSkeleton;
