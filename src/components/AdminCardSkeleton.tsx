import {
  HStack,
  Skeleton,
  Stack,
  VStack
} from "@chakra-ui/react";

const AdminCardSkeleton = () => {
  return (
    <VStack spacing={4} align="stretch" w="100%" p={4}>
      <Skeleton borderRadius={10} overflow="hidden" h="200px" />
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
      <HStack justifyContent="space-between" padding={2}>
        <Skeleton w="100px" h="35px">
          <div>radouane</div>
        </Skeleton>

        <Skeleton w="100px" h="35px">
          <div>radouane</div>
        </Skeleton>
      </HStack>
    </VStack>
  );
};

export default AdminCardSkeleton;
