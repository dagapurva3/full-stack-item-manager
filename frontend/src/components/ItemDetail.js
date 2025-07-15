import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Badge,
  Button,
  Flex,
  useToast,
  Spinner,
  Center,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
import useItems from '../hooks/useItems';
import * as itemApi from '../services/itemApi';

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { items } = useItems();

  // Find the item by ID from the items array or fetch from backend
  useEffect(() => {
    const foundItem = items.find(item => item.id === parseInt(id));
    if (foundItem) {
      setItem(foundItem);
      setLoading(false);
    } else {
      // Fetch from backend if not found in local state
      const fetchItem = async () => {
        try {
          setLoading(true);
          const res = await itemApi.fetchItem(id);
          setItem(res.data);
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Item not found',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          navigate('/');
        } finally {
          setLoading(false);
        }
      };
      fetchItem();
    }
  }, [id, items, toast, navigate]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'gray';
      case 'archived': return 'red';
      default: return 'gray';
    }
  };

  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!item) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color="gray.500">
          Item not found
        </Text>
      </Box>
    );
  }

  return (
    <Box maxW="800px" mx="auto">
      <Flex align="center" mb={6}>
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          onClick={() => navigate('/')}
          mr={4}
        >
          Back
        </Button>
        <Heading size="lg">Item Details</Heading>
      </Flex>

      <Card>
        <CardHeader>
          <VStack align="start" spacing={3}>
            <Flex justify="space-between" align="center" w="full">
              <Heading size="lg">{item.name}</Heading>
              <HStack spacing={2}>
                <Badge
                  colorScheme={item.group === 'Primary' ? 'blue' : 'green'}
                  fontSize="md"
                  px={3}
                  py={1}
                >
                  {item.group}
                </Badge>
                <Badge
                  colorScheme={getStatusColor(item.status)}
                  fontSize="md"
                  px={3}
                  py={1}
                >
                  {item.status}
                </Badge>
                <Badge
                  colorScheme={getPriorityColor(item.priority)}
                  fontSize="md"
                  px={3}
                  py={1}
                >
                  {item.priority}
                </Badge>
              </HStack>
            </Flex>
            {item.description && (
              <Text fontSize="md" color="gray.600">
                {item.description}
              </Text>
            )}
          </VStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={6} align="start">
            {/* Basic Information */}
            <Box w="full">
              <Heading size="md" mb={4}>Basic Information</Heading>
              <VStack spacing={3} align="start">
                <HStack spacing={4}>
                  <Text fontWeight="medium" color="gray.600" minW="100px">
                    Name:
                  </Text>
                  <Text fontSize="lg">{item.name}</Text>
                </HStack>
                
                <HStack spacing={4}>
                  <Text fontWeight="medium" color="gray.600" minW="100px">
                    Group:
                  </Text>
                  <Text fontSize="lg">{item.group}</Text>
                </HStack>
                
                <HStack spacing={4}>
                  <Text fontWeight="medium" color="gray.600" minW="100px">
                    Status:
                  </Text>
                  <Badge colorScheme={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </HStack>
                
                <HStack spacing={4}>
                  <Text fontWeight="medium" color="gray.600" minW="100px">
                    Priority:
                  </Text>
                  <Badge colorScheme={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Details */}
            <Box w="full">
              <Heading size="md" mb={4}>Details</Heading>
              <VStack spacing={3} align="start">
                {item.price && (
                  <HStack spacing={4}>
                    <Text fontWeight="medium" color="gray.600" minW="100px">
                      Price:
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="green.600">
                      ${parseFloat(item.price).toFixed(2)}
                    </Text>
                  </HStack>
                )}
                
                <HStack spacing={4}>
                  <Text fontWeight="medium" color="gray.600" minW="100px">
                    Quantity:
                  </Text>
                  <Text fontSize="lg">{item.quantity}</Text>
                </HStack>
                
                {item.location && (
                  <HStack spacing={4}>
                    <Text fontWeight="medium" color="gray.600" minW="100px">
                      Location:
                    </Text>
                    <Text fontSize="lg">📍 {item.location}</Text>
                  </HStack>
                )}
                
                {item.tag_list && item.tag_list.length > 0 && (
                  <HStack spacing={4} align="start">
                    <Text fontWeight="medium" color="gray.600" minW="100px">
                      Tags:
                    </Text>
                    <HStack spacing={1} flexWrap="wrap">
                      {item.tag_list.map((tag, index) => (
                        <Badge key={index} colorScheme="purple">
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                  </HStack>
                )}
              </VStack>
            </Box>

            <Divider />

            {/* Metadata */}
            <Box w="full">
              <Heading size="md" mb={4}>Metadata</Heading>
              <VStack spacing={3} align="start">
                <HStack spacing={4}>
                  <Text fontWeight="medium" color="gray.600" minW="100px">
                    Created:
                  </Text>
                  <Text fontSize="lg">
                    {new Date(item.created_at).toLocaleString()}
                  </Text>
                </HStack>
                
                <HStack spacing={4}>
                  <Text fontWeight="medium" color="gray.600" minW="100px">
                    Updated:
                  </Text>
                  <Text fontSize="lg">
                    {new Date(item.updated_at).toLocaleString()}
                  </Text>
                </HStack>
              </VStack>
            </Box>

            <Button
              leftIcon={<EditIcon />}
              colorScheme="green"
              size="lg"
              w="full"
              onClick={() => navigate(`/item/${item.id}/edit`)}
            >
              Edit Item
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ItemDetail;