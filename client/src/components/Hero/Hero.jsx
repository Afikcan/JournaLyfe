import React from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import home_page_img from "../../asset/home_page_img.png";
import buddy_img from "../../asset/buddy.svg";
import share_stories_img from "../../asset/share_stories.svg";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const mainTextColor = useColorModeValue("orange.500", "orange.200");
  const highlightColor = useColorModeValue("purple.500", "purple.800");

  const navigateToRegister = () => {
    navigate("/register"); // Navigate to the register page
  };

  return (
    <Container maxW="8xl">
      <Stack
        textAlign="center"
        align="center"
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 20, md: 28 }}
      >
        <Flex justifyContent="center" alignItems="center" gap="20px">
          <Box textAlign="center">
            <Heading
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
              lineHeight="110%"
              color={mainTextColor}
            >
              Embark on Your Adventure: Discover
              <Text
                as="span"
                sx={{ fontFamily: "Pacifico, cursive" }}
                color={highlightColor}
              >
                {" "}
                Paths Untraveled
              </Text>
            </Heading>
            <Button
              marginTop={"10px"}
              onClick={navigateToRegister}
              rounded="full"
              size="lg" // Larger button size
              fontWeight="bold" // Bold font weight
              px={8} // Increased padding for a wider button
              py={4} // Increased padding for a taller button
              colorScheme="purple" // A standout color scheme
              bgGradient="linear(to-r, purple.400, orange.500)" // Gradient background
              boxShadow="0px 4px 15px rgba(0, 0, 0, 0.2)" // Drop shadow for depth
              _hover={{
                bgGradient: "linear(to-r, purple.500, orange.600)",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
              }} // Enhanced hover effect
              transition="all 0.3s ease" // Smooth transition for hover effect
            >
              Get Started
            </Button>
          </Box>
          <Box>
            <Image
              src={home_page_img}
              alt="Journey Image"
              borderRadius="100px"
              boxSize="300px"
              objectFit="cover"
            />
          </Box>
        </Flex>
        <Flex justifyContent="center" alignItems="center" gap="20px">
          <Box>
            <Image
              src={buddy_img}
              alt="Buddy Image"
              borderRadius="full"
              boxSize="300px"
              objectFit="cover"
            />
          </Box>
          <Box textAlign="center">
            <Heading
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
              lineHeight="110%"
              color={mainTextColor}
            >
              Meet Your
              <Text
                as="span"
                sx={{ fontFamily: "Pacifico, cursive" }}
                color={highlightColor}
              >
                {" "}
                Buddy
              </Text>
            </Heading>
          </Box>
        </Flex>
        <Flex justifyContent="center" alignItems="center" gap="20px">
          <Box textAlign="center">
            <Heading
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
              lineHeight="110%"
              color={mainTextColor}
            >
              Connect and Collaborate: Building Bridges Through Stories
            </Heading>
          </Box>
          <Box>
            <Image
              src={share_stories_img}
              alt="Sharing Stories Image"
              boxSize="300px"
              objectFit="cover"
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
