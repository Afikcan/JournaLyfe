import React, { useRef, useEffect } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";

import { getIsLogged } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const navigate = useNavigate();
  const isLogged = useSelector(getIsLogged);

  useEffect(() => {
    if (isLogged) {
      navigate("/myJournal");
    }
  }, [isLogged, navigate]);

  return (
    <Box
      minHeight="80vh"
      flexDirection="column"
      bg={useColorModeValue("orange.300", "orange.500")}
      alignItems="center"
      justifyContent="center"
    >
      <Hero />
      <Footer />
    </Box>
  );
}
