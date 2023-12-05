import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Divider,
  Image,
  Text,
} from "@chakra-ui/react";
import Footer from "../../components/FooterSmall";
import { useSelector } from "react-redux";
import { getIsLogged, getUser } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../data/baseUrl";
import { useToast } from "@chakra-ui/react";

export default function MyJournal() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedWriting, setSelectedWriting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();
  const isLogged = useSelector(getIsLogged);
  const user = useSelector(getUser);

  const modalBg = useColorModeValue("gray.100", "gray.700");
  const modalHoverBg = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    } else if (user && user.user_id) {
      setUserId(user.user_id);
    }
  }, [isLogged, user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const assembledData = await assembleData(userId);
      setData(assembledData);
    };

    fetchData();
  }, [userId]);

  const fetchWritings = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/writing/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching writings", error);
    }
  };

  const fetchCommentsAndImage = async (writingId) => {
    const commentsResponse = await axios.get(`${baseUrl}/comment/${writingId}`);
    const imageResponse = await axios.get(`${baseUrl}/image/${writingId}`);

    return {
      comments: commentsResponse.data,
      image: imageResponse.data,
    };
  };

  const assembleData = async (userId) => {
    try {
      const writings = await fetchWritings(userId);

      const writingsWithDetails = await Promise.all(
        writings.map(async (writing) => {
          const details = await fetchCommentsAndImage(writing.writing_id);
          return {
            writing,
            comments: details.comments,
            image: details.image,
          };
        })
      );
      return writingsWithDetails;
    } catch (error) {
      console.error("Error assembling data", error);
    }
  };

  const openModal = (writing) => {
    setSelectedWriting(writing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedWriting(null);
    setIsModalOpen(false);
  };

  const togglePublishStatus = async () => {
    try {
      const newPublishedStatus = !selectedWriting.writing.published;
      await axios.put(
        `${baseUrl}/writing/changePublishedStatus/${selectedWriting.writing.writing_id}`,
        {
          newPublishedStatus,
        }
      );

      // Update the local state to reflect the change
      setSelectedWriting((prevSelectedWriting) => ({
        ...prevSelectedWriting,
        writing: {
          ...prevSelectedWriting.writing,
          published: newPublishedStatus,
        },
      }));

      // Display success toast
      toast({
        title: `Your journal is now ${
          newPublishedStatus ? "published" : "unpublished"
        }`,
        description: `"${selectedWriting.writing.title}"`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  return (
    <>
      <Flex
        minHeight="80vh"
        flexDirection="column"
        bg={useColorModeValue("orange.300", "orange.500")}
        alignItems="center"
        pt={6}
      >
        <Heading as="h2" size="lg" mb={4}>
          My Journal
        </Heading>
        <Divider mb={4} />
        <Flex
          flexDirection="row" // setting the direction to row
          wrap="wrap" // enabling wrapping
          gap="20px" // setting a gap between boxes
          justifyContent="center" // optional, for horizontal alignment
        >
          {data.map((item) => (
            <Box
              key={item.writing.writing_id}
              onClick={() => openModal(item)}
              cursor="pointer"
            >
              <Flex
                align="center"
                justify="center"
                p={6}
                boxShadow="md"
                borderRadius="md"
                role="button"
                bg={modalBg}
                _hover={{ bg: modalHoverBg }}
                flexDirection={"column"}
              >
                <Image
                  src={item.image[0].link}
                  alt={item.writing.title}
                  boxSize="200px"
                  objectFit="contain"
                />
                <Text mt={4} fontWeight="bold">
                  {item.writing.title}
                </Text>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Flex>
      <Footer />

      {selectedWriting && (
        <Modal p={5} isOpen={isModalOpen} onClose={closeModal} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedWriting.writing.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={selectedWriting.image[0].link}
                alt={selectedWriting.writing.title}
              />

              <Text fontSize="xl">{selectedWriting.writing.content}</Text>
              <Divider mb={4} mt={4} />

              {/* Header for Comments */}
              <Heading as="h3" size="lg" mb={4}>
                Comments
              </Heading>

              {/* Displaying comments */}
              {selectedWriting.comments.map((comment) => (
                <Box key={comment.comment_id} mb={4}>
                  <Text fontSize="lg" fontWeight="bold">
                    {comment.username}
                  </Text>
                  <Text fontSize="md">{comment.content}</Text>
                </Box>
              ))}
              {user.sub_tier !== "free" && (
                <Button
                  colorScheme={
                    selectedWriting.writing.published ? "purple" : "orange"
                  }
                  onClick={togglePublishStatus}
                  mt={4}
                >
                  {selectedWriting.writing.published ? "Unpublish" : "Publish"}
                </Button>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
