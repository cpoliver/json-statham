import React from "react"
import { Stack, Text } from "@chakra-ui/react"

type JsonDiffProps = {
  documentA: string
  documentB: string
}

export const JsonDiff: React.FC<JsonDiffProps> = ({ documentA, documentB }) => (
  <Stack direction="row">
     <Text as="pre" flex={1}>{documentA}</Text>
     <Text as="pre" flex={1}>{documentB}</Text>
  </Stack>
)