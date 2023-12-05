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
import axios from "axios";
import baseUrl from "../../data/baseUrl";

export default function Blog() {
  const [data, setData] = useState([]);
  const [selectedWriting, setSelectedWriting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <Divider mb={4} />
        <Flex
          flexDirection="row"
          wrap="wrap"
          gap="20px"
          justifyContent="center"
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
