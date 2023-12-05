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
} from "@chakra-ui/react";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsLogged, getUser } from "../../reducers/authSlice";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import baseUrl from "../../data/baseUrl";

export default function CreateJournal() {
  const navigate = useNavigate();
  const isLogged = useSelector(getIsLogged);
  const user = useSelector(getUser);
  const toast = useToast();

  const [journalEntry, setJournalEntry] = useState("");
  const [title, setTitle] = useState("");

  const bgColor = useColorModeValue("orange.300", "orange.500");
  const headingColor = useColorModeValue("purple.500", "white");
  const buttonColorScheme = useColorModeValue("orange", "purple");
  const textareaBgColor = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  const handleInputChange = (e) => {
    setJournalEntry(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title || !journalEntry) {
      alert("Please fill in both title and content.");
      return;
    }

    try {
      const user_id = user.user_id;
      const published = user.sub_tier !== "free" ? true : false;

      await axios
        .post(`${baseUrl}/writing/post`, {
          user_id,
          title,
          content: journalEntry,
          published,
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
              >
                Submit
              </Button>
            </VStack>
          </Container>
        </Flex>
      )}
      <Footer />
    </>
  );
}
