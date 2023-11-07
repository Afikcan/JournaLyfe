import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <Flex
        minHeight="80vh"
        flexDirection="column"
        bg={useColorModeValue("orange.300", "orange.500")}
        alignItems="center"
        justifyContent="center"
      >
        <Box width="70%" maxWidth="800px" padding="20px"></Box>
      </Flex>
      <Footer />
    </>
  );
}
