import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Textarea,
  useColorModeValue,
  VStack,
  Flex,
  Heading,
  Input,
  Spinner,
  Alert,
  AlertIcon,
  Select,
} from "@chakra-ui/react";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsLogged, getUser } from "../../reducers/authSlice";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import baseUrl from "../../data/baseUrl";

export default function CreateJournal() {
  const [journalEntry, setJournalEntry] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const isLogged = useSelector(getIsLogged);
  const user = useSelector(getUser);
  const toast = useToast();

  const bgColor = useColorModeValue("orange.300", "orange.500");
  const headingColor = useColorModeValue("purple.500", "white");
  const buttonColorScheme = useColorModeValue("orange", "purple");
  const textareaBgColor = useColorModeValue("gray.100", "gray.700");

  const selectBg = useColorModeValue("gray.100", "gray.700");
  const selectHoverBg = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  const handleInputChange = (e) => {
    setJournalEntry(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title || !journalEntry || !color) {
      toast({
        position: "top",
        render: () => (
          <Alert status="error" variant="solid">
            <AlertIcon />
            Please fill in both title, content, and color.
          </Alert>
        ),
        duration: 3000,
      });
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const user_id = user.user_id;
      const published = user.sub_tier !== "free" ? true : false;

      await axios
        .post(`${baseUrl}/writing/post`, {
          user_id,
          title,
          content: journalEntry,
          published,
          color,
        })
        .then(async (res) => {
          await axios.post(`${baseUrl}/image/postImage`, {
            user_id,
            content: journalEntry,
            imageUrl: res.data.imageUrl,
            writing_id: res.data.writing_id,
            published: true,
          });
        });

      // Decrease user's credit after successful journal entry submission
      await decreaseCredit(user_id);

      // Display success toast
      toast({
        title: `Your journal is created `,
        description: `"${title}"`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting journal entry:", error);
      // Handle the error, e.g., showing an error message
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const decreaseCredit = async (userId) => {
    try {
      await axios.post(`${baseUrl}/decreaseCredit/${userId}`);
    } catch (error) {
      console.error("Error decreasing credit:", error);
    }
  };

  return (
    <>
      {isLogged && (
        <Flex
          align="center"
          justify="center"
          bg={bgColor}
          py={12}
          minH="calc(100vh - 120px)"
          flexDirection="column"
        >
          <Heading color={headingColor} mb={6}>
            Your Story Awaits: Unfold Your Thoughts
          </Heading>
          <Container centerContent>
            <VStack spacing={4} mt="40px">
              <Select
                placeholder="Select color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                bg={selectBg}
                _hover={{ bg: selectHoverBg }}
              >
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Purple">Purple</option>
                <option value="Orange">Orange</option>
                <option value="Pink">Pink</option>
                <option value="Brown">Brown</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
              </Select>
              <Input
                placeholder="Title of your journal entry"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                bg={textareaBgColor}
                size="lg"
                width="700px"
              />
              <Textarea
                placeholder="Write your journal entry here..."
                value={journalEntry}
                onChange={handleInputChange}
                bg={textareaBgColor}
                size="lg"
                height="500px"
                width="700px"
              />
              <Button
                colorScheme={buttonColorScheme}
                onClick={handleSubmit}
                px={6}
                isDisabled={isLoading} // Disable button when loading
              >
                {isLoading ? <Spinner size="sm" /> : "Submit"}
              </Button>
            </VStack>
          </Container>
        </Flex>
      )}
      <Footer />
    </>
  );
}
