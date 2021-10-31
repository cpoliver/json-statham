import React from 'react';
import { Stack } from "@chakra-ui/react"

import { DynamicFormDemo } from './components/DynamicFormDemo/DynamicFormDemo';

export const App: React.FC = () => (
  <Stack h="100vh" w="100vw" pos="fixed" top={0} left={0} bottom={0} right={0} bg="green.200">
    <DynamicFormDemo />
  </Stack>
)
