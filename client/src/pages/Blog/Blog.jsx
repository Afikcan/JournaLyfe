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
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import Footer from "../../components/FooterSmall";
import axios from "axios";
import baseUrl from "../../data/baseUrl";
import { useSelector } from "react-redux";
import { getIsLogged, getUser } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function Blog() {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(null);
  const [selectedWriting, setSelectedWriting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterColor, setFilterColor] = useState("");

  const navigate = useNavigate();
  const isLogged = useSelector(getIsLogged);
  const user = useSelector(getUser);
  const toast = useToast();

  const modalBg = useColorModeValue("gray.100", "gray.700");
  const modalHoverBg = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    const fetchData = async () => {
      const writings = await fetchWritings();
      const assembledData = await assembleData(writings);
      setData(assembledData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    } else if (user && user.user_id) {
      setUserId(user.user_id);
    }
  }, [isLogged, user, navigate]);

  const fetchWritings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/writing/getAllPublished`);
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

  const assembleData = async (writings) => {
    try {
      return await Promise.all(
        writings.map(async (writing) => {
          const details = await fetchCommentsAndImage(writing.writing_id);
          return {
            writing,
            comments: details.comments,
            image: details.image,
          };
        })
      );
    } catch (error) {
      console.error("Error assembling data", error);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const submitComment = async () => {
    try {
      const response = await axios.post(`${baseUrl}/comment`, {
        user_id: userId,
        content: comment,
        writing_id: selectedWriting.writing.writing_id,
        username: user.username,
      });

      // Show success toast
      toast({
        title: "Comment posted.",
        description: "Your comment has been successfully posted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Update comments in the UI
      setSelectedWriting({
        ...selectedWriting,
        comments: [...selectedWriting.comments, response.data],
      });

      // Reset comment input field
      setComment("");
    } catch (error) {
      console.error("Error submitting comment", error);
      // Optionally, show an error toast
      toast({
        title: "Error.",
        description: "There was an error posting your comment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
          Blog
        </Heading>
        {/* Color Filter Select Component */}
        <Flex justify="center" width="full" mb={4}>
          <Select
            placeholder="Filter by color"
            value={filterColor}
            onChange={(e) => setFilterColor(e.target.value)}
            width="250px" // Smaller width
            variant="filled" // Filled variant for coherent look
            bg={modalBg}
            _hover={{ bg: modalHoverBg }}
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
        </Flex>
        <Divider mb={4} />
        <Flex
          flexDirection="row"
          wrap="wrap"
          gap="20px"
          justifyContent="center"
        >
          {data
            .filter(
              (item) => !filterColor || item.writing.color === filterColor
            )
            .map((item) => (
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
                    src={item.image.length > 0 ? item.image[0].link : ""}
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
        <Modal isOpen={isModalOpen} onClose={closeModal} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedWriting.writing.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={
                  selectedWriting.image.length > 0
                    ? selectedWriting.image[0].link
                    : ""
                }
                alt={selectedWriting.writing.title}
              />
              <Text fontSize="xl">{selectedWriting.writing.content}</Text>
              <Divider mb={4} mt={4} />

              <FormControl mb={4}>
                <FormLabel htmlFor="comment">Write a Comment</FormLabel>
                <Input
                  id="comment"
                  placeholder="Enter your comment here"
                  value={comment}
                  onChange={handleCommentChange}
                />
                <Button mt={4} colorScheme="orange" onClick={submitComment}>
                  Submit Comment
                </Button>
              </FormControl>

              <Heading as="h3" size="lg" mb={4}>
                Comments
              </Heading>
              {selectedWriting.comments.map((comment) => (
                <Box key={comment.comment_id} mb={4}>
                  <Text fontSize="lg" fontWeight="bold">
                    {comment.username}
                  </Text>
                  <Text fontSize="md">{comment.content}</Text>
                </Box>
              ))}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
