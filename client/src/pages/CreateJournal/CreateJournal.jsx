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
} from "@chakra-ui/react";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { getIsLogged } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";

export default function CreateJournal() {
  const navigate = useNavigate();
  const isLogged = useSelector(getIsLogged);
  const [journalEntry, setJournalEntry] = useState("");

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

  const handleSubmit = () => {
    console.log("Submitting:", journalEntry);
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
