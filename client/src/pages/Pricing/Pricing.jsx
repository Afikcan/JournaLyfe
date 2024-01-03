import { ReactNode } from "react";
import {
  Box,
  Stack,
  HStack,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../../components/FooterSmall";

function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("purple.800", "orange.300")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function Pricing() {
  return (
    <>
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("orange.300", "orange.500")}
        py={12}
        minH={"calc(100vh - 120px)"}
      >
        <Stack spacing={8} mx={"auto"}>
          <Stack spacing={2} textAlign="center">
            <Heading as="h1" fontSize="4xl" color={"purple.500"}>
              Plans that fit your need
            </Heading>
            <Text fontSize="lg">
              Start with 14-day free trial. No credit card needed. Cancel at
              anytime.
            </Text>
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            textAlign="center"
            justify="center"
            spacing={{ base: 4, lg: 10 }}
            py={10}
          >
            <PriceWrapper>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Free
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    $
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    0
                  </Text>
                  <Text fontSize="3xl" color="purple.800">
                    /month
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue("white", "purple.700")}
                maxW={"320px"}
                py={4}
                borderBottomRadius={"xl"}
              >
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    10 initial credits
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />5 credits
                    per month
                  </ListItem>

                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />1 credit
                    per invite
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Limited talk with your buddy
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    500 characters limit for your writings
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Link to="/register">
                    <Button w="full" colorScheme="orange" variant="outline">
                      Register for free
                    </Button>
                  </Link>
                </Box>
              </VStack>
            </PriceWrapper>

            <PriceWrapper>
              <Box position="relative">
                <Box
                  position="absolute"
                  top="-16px"
                  left="50%"
                  style={{ transform: "translate(-50%)" }}
                >
                  <Text
                    textTransform="uppercase"
                    bg={useColorModeValue("purple.500", "purple.300")}
                    px={3}
                    py={1}
                    color={useColorModeValue("black", "black")}
                    fontSize="sm"
                    fontWeight="600"
                    rounded="xl"
                  >
                    Most Popular
                  </Text>
                </Box>
                <Box py={4} px={12}>
                  <Text fontWeight="500" fontSize="2xl">
                    Premium
                  </Text>
                  <HStack justifyContent="center">
                    <Text fontSize="3xl" fontWeight="600">
                      $
                    </Text>
                    <Text fontSize="5xl" fontWeight="900">
                      19
                    </Text>
                    <Text fontSize="3xl" color="purple.800">
                      /month
                    </Text>
                  </HStack>
                </Box>
                <VStack
                  bg={useColorModeValue("white", "purple.700")}
                  py={4}
                  maxW={"400px"}
                  borderBottomRadius={"xl"}
                >
                  <List spacing={3} textAlign="start" px={12}>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      25 bonus credit
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      10 credits per week
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Feel free to comment any writing and have fun with other
                      users!
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Create an anonymous username from your Lyfe-Style
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Be able publish your writings
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Talk with your buddy any time you want
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      1200 characters limit for your writings
                    </ListItem>
                  </List>
                  <Box w="80%" pt={7}>
                    <Link to="/register">
                      <Button
                        w="full"
                        bgGradient="linear(to-r, orange.300, orange.600)"
                        colorScheme="purple"
                        boxShadow={"0 5px 20px 0px rgb(98 178 236/ 60%)"}
                      >
                        Start trial
                      </Button>
                    </Link>
                  </Box>
                </VStack>
              </Box>
            </PriceWrapper>
            <PriceWrapper>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Ultimate
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    $
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    34
                  </Text>
                  <Text fontSize="3xl" color="purple.800">
                    /month
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue("white", "purple.700")}
                py={4}
                maxW={"320px"}
                borderBottomRadius={"xl"}
              >
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    50 bonus credits
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    10 credits per day
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Be able to edit AI generated art
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    NO limit for your writings!!!
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Link to="/register">
                    <Button w="full" colorScheme="orange" variant="outline">
                      Start trial
                    </Button>
                  </Link>
                </Box>
              </VStack>
            </PriceWrapper>
          </Stack>
        </Stack>
      </Flex>
      <Footer />
    </>
  );
}
