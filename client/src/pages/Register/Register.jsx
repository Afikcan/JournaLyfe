import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { setAuth, fetchUser, setUser } from "../../reducers/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import baseUrl from "../../data/baseUrl";
import axios from "axios";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    email: "",
    date_of_birth: "",
    credit_count: 5,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log(JSON.stringify(formData));
      // Make a POST request to your backend API to register the user
      const response = await fetch(baseUrl + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const parseRes = await response.json();

        if (parseRes.token) {
          dispatch(
            setAuth({
              token: parseRes.token,
              isLogged: true,
            })
          );
          localStorage.setItem("token", parseRes.token);
          //localStorage.setItem("user", parseRes.userId);
          navigate("/");

          toast({
            title: "Log in successful.",
            description: `Welcome back!`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });

          const user = await dispatch(fetchUser(parseRes.userId));

          dispatch(
            setUser({
              user: user.payload,
            })
          );
        }

        toast({
          title: "Register successful.",
          description: "Welcome to JournaLyfe!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        // Handle registration failure, e.g., show error message to the user
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("orange.300", "orange.500")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"purple.700"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "purple.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="dateOfBirth" isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"purple.400"}
                color={"white"}
                _hover={{
                  bg: "purple.500",
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? Click{" "}
                <Link to="/login" style={{ color: "#996bff" }}>
                  here
                </Link>{" "}
                to log in!
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
