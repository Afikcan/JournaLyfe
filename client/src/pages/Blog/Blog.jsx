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

export default function Blog() {
  const navigate = useNavigate();
  const isLogged = useSelector(getIsLogged);
  const user = useSelector(getUser);

  const bgColor = useColorModeValue("orange.300", "orange.500");

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

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
        ></Flex>
      )}
      <Footer />
    </>
  );
}
