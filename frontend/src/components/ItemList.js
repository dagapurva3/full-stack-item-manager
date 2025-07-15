import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Badge,
  Button,
  Flex,
  Select,
  useToast,
  Spinner,
  Center,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import useItems from '../hooks/useItems';

const ItemList = () => {
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const toast = useToast();

  const { items, loading, fetchItems, setItems } = useItems();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = items.filter(item => {
    const groupMatch = filter === 'all' || item.group === filter;
    const statusMatch = statusFilter === 'all' || item.status === statusFilter;
    return groupMatch && statusMatch;
  });

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

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
        <Heading size="lg">Items</Heading>
        <HStack spacing={4}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            w="150px"
          >
            <option value="all">All Groups</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
          </Select>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            w="150px"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </Select>
        </HStack>
      </Flex>

      {filteredItems.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" color="gray.500">
            No items found
          </Text>
        </Box>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6}>
          {filteredItems.map((item) => (
            <Card key={item.id} shadow="md" _hover={{ shadow: 'lg' }} h="full" display="flex" flexDirection="column">
              <CardHeader>
                <VStack align="start" spacing={2}>
                  <Flex justify="space-between" align="center" w="full">
                    <Heading size="md">{item.name}</Heading>
                    <HStack spacing={2}>
                      <Badge
                        colorScheme={item.group === 'Primary' ? 'blue' : 'green'}
                      >
                        {item.group}
                      </Badge>
                      <Badge colorScheme={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <Badge colorScheme={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </HStack>
                  </Flex>
                  {item.description && (
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                      {item.description}
                    </Text>
                  )}
                </VStack>
              </CardHeader>
              <CardBody flex="1" display="flex" flexDirection="column">
                <VStack spacing={3} align="start" flex="1">
                  <HStack spacing={4} w="full">
                    {item.price && (
                      <Text fontSize="sm" fontWeight="medium">
                        Price: ${parseFloat(item.price).toFixed(2)}
                      </Text>
                    )}
                    <Text fontSize="sm" fontWeight="medium">
                      Qty: {item.quantity}
                    </Text>
                  </HStack>
                  
                  {item.location && (
                    <Text fontSize="sm" color="gray.600">
                      📍 {item.location}
                    </Text>
                  )}
                  
                  {item.tag_list && item.tag_list.length > 0 && (
                    <HStack spacing={1} flexWrap="wrap">
                      {item.tag_list.map((tag, index) => (
                        <Badge key={index} size="sm" colorScheme="purple">
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                  )}
                  
                  <Text fontSize="xs" color="gray.500" mt="auto">
                    Created: {new Date(item.created_at).toLocaleDateString()}
                  </Text>
                </VStack>
                
                <Flex gap={2} w="full" mt={4}>
                  <Button
                    as={RouterLink}
                    to={`/item/${item.id}`}
                    leftIcon={<ViewIcon />}
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    flex={1}
                  >
                    View
                  </Button>
                  <Button
                    as={RouterLink}
                    to={`/item/${item.id}/edit`}
                    leftIcon={<EditIcon />}
                    size="sm"
                    colorScheme="green"
                    variant="outline"
                    flex={1}
                  >
                    Edit
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ItemList; 