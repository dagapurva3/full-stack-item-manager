import React from 'react';
import { Box, Flex, Heading, Button, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';

const Header = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bg} borderBottom="1px" borderColor={borderColor} px={4} py={4}>
      <Flex maxW="container.xl" mx="auto" align="center" justify="space-between">
        <RouterLink to="/">
          <Heading size="lg" color="blue.600">
            Item Manager
          </Heading>
        </RouterLink>
        <Button
          as={RouterLink}
          to="/create"
          leftIcon={<AddIcon />}
          colorScheme="blue"
          size="md"
        >
          Add Item
        </Button>
      </Flex>
    </Box>
  );
};

export default Header; 