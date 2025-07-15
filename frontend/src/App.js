import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import Header from './components/Header';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import CreateItem from './components/CreateItem';
import EditItem from './components/EditItem';

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Container maxW="container.xl" py={8}>
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/create" element={<CreateItem />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/item/:id/edit" element={<EditItem />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App; 