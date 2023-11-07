import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("orange.200", "orange.400")}
    >
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h1"
          size="4xl"
          bgGradient="linear(to-r, purple.300, purple.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="2.5rem" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text fontSize="1.1rem" color={"purple.500"} mb={6}>
          Oops, the page you're looking for does not seem to exist!
        </Text>
        <Link to="/">
          <Button
            colorScheme="purple"
            bgGradient="linear(to-r, purple.300, purple.600)"
            _hover={{ bgGradient: "linear(to-r, purple.200, purple.500)" }}
            color="white"
            variant="solid"
          >
            Go to Home
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
