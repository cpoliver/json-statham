import { Flex, FormControl, FormLabel, Select, Stack, useToast } from "@chakra-ui/react"
import React, { useState } from "react"

import { connectionTypes, ConnectionType, DynamicForm } from "./DynamicForm"

export const DynamicFormDemo: React.FC = () => {
  const toast = useToast()
  const [connectionType, setConnectionType] = useState<ConnectionType>(connectionTypes[0])

  return (
    <Flex
      align="center"
      bg="turquoise.300"
      bottom={0}
      flex={1}
      h="100vh"
      justify="center"
      left={0}
      pos="absolute"
      right={0}
      top={0}
    >
      <Stack bg="gray.50" borderRadius="lg" boxShadow="notification" minW={600}>
        <FormControl bg="white" borderTopRadius="lg" boxShadow="pill" p={8}>
          <FormLabel>Connection Type</FormLabel>
          <Select onChange={({ target }) => setConnectionType(target.value as ConnectionType)}>
            {connectionTypes.map((connectionType) => (
              <option key={connectionType} value={connectionType}>
                {connectionType.toString().toUpperCase()}
              </option>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" flex={1}>
          <Stack flex={1} minH={520} p={8} spacing={8}>
            <DynamicForm
              connectionType={connectionType}
              onSubmit={(data) => {
                console.log(data)

                toast({
                  title: "Form Values",
                  description: JSON.stringify(data, null, 2),
                  status: "info",
                  position: "top-right",
                  isClosable: true,
                })
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  )
}