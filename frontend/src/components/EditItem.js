import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  useToast,
  Flex,
  Spinner,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import useItems from '../hooks/useItems';

const EditItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    group: 'Primary',
    status: 'active',
    priority: 'medium',
    price: '',
    quantity: 1,
    location: '',
    tags: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { updateItem } = useItems();

  // Move fetchItem above useEffect
  const fetchItem = useCallback(async () => {
    try {
      setLoading(true);
      const data = await itemService.getItem(id);
      setFormData({
        name: data.name,
        description: data.description || '',
        group: data.group,
        status: data.status,
        priority: data.priority,
        price: data.price || '',
        quantity: data.quantity,
        location: data.location || '',
        tags: data.tags || '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch item details',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [id, toast, navigate]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Item name is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Convert price to number if provided
    const submitData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
      quantity: parseInt(formData.quantity),
    };

    try {
      setSubmitting(true);
      await updateItem(id, submitData);
      toast({
        title: 'Success',
        description: 'Item updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(`/item/${id}`);
    } catch (error) {
      const errorMessage = error.response?.data?.name?.[0] || 
                          error.response?.data?.non_field_errors?.[0] ||
                          'Failed to update item';
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
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
    <Box maxW="800px" mx="auto">
      <Flex align="center" mb={6}>
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          onClick={() => navigate(`/item/${id}`)}
          mr={4}
        >
          Back
        </Button>
        <Heading size="lg">Edit Item</Heading>
      </Flex>

      <Card>
        <CardHeader>
          <Heading size="md">Update Item Details</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              {/* Basic Information */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                <FormControl isRequired>
                  <FormLabel>Item Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter item name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Group</FormLabel>
                  <Select
                    name="group"
                    value={formData.group}
                    onChange={handleChange}
                  >
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter item description"
                  rows={3}
                />
              </FormControl>

              {/* Status and Priority */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                <FormControl isRequired>
                  <FormLabel>Status</FormLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="archived">Archived</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              {/* Price and Quantity */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <NumberInput
                    value={formData.price}
                    onChange={(value) => handleNumberChange('price', value)}
                    min={0}
                    precision={2}
                  >
                    <NumberInputField placeholder="0.00" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput
                    value={formData.quantity}
                    onChange={(value) => handleNumberChange('quantity', value)}
                    min={1}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </SimpleGrid>

              {/* Location and Tags */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter item location"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Tags</FormLabel>
                  <Input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="tag1, tag2, tag3"
                  />
                </FormControl>
              </SimpleGrid>

              <Button
                type="submit"
                colorScheme="green"
                size="lg"
                w="full"
                isLoading={submitting}
                loadingText="Updating..."
              >
                Update Item
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default EditItem; 