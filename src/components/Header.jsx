import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, Icon, Flex } from "@chakra-ui/react";
import { FaRegHeart, FaRegMoon } from "react-icons/fa"; // Using react-icons

const Header = () => {
  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="4"
      borderBottom="1px solid #ccc"
    >
      <Text fontSize="1xl" fontWeight="bold">
        Where in the world?
      </Text>
      <div className= "display-row">
      <FaRegHeart />
      <Link variant="plain" href="src/pages/SavedCountries/SavedCountries.jsx">
        Saved Countries
      </Link>
      <FaRegMoon />
      <Link variant="plain" href="src/pages/SavedCountries/SavedCountries.jsx">
        Dark Mode
      </Link>
      </div>
    </Box>
  );
};

export default Header;
