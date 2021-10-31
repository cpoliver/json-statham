import React from 'react';
import { ChakraProvider , Stack, Text, Heading, Spacer } from "@chakra-ui/react"

export const App: React.FC = () => (
  <ChakraProvider>
  <Stack h="100vh" w="100vw" pos="fixed" top={0} left={0} bottom={0} right={0}>
    <AppBar />
    <JsonCompare />
    <Footer />
  </Stack>
  </ChakraProvider>
)

const AppBar: React.FC = () => (
  <Stack direction="row" p={4}>
    <Heading as="h1" fontSize="lg">JSON Compare</Heading>
    <Spacer />
    <FileUpload />
    <FileUpload />
  </Stack>
)

const FileUpload = Stack

const JsonCompare = Stack

const Footer = Stack