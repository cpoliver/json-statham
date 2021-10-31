import React, { useEffect, useState } from 'react';
import { Box, Stack, Heading, Spacer } from "@chakra-ui/react"
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { FileValidated } from '@dropzone-ui/react/build/components/dropzone/components/utils/validation.utils';

import { JsonDiff } from "./components/JsonDiff/JsonDiff"

const readFile = async (file: FileValidated) => { return await file.file.text() }

export const App: React.FC = () => {
  const [files, setFiles] = useState<FileValidated[]>([]);

  const [documentA, setDocumentA] = useState<string>()
  const [documentB, setDocumentB] = useState<string>()

  useEffect(() => {
    if (!files || files.length !== 2) return

    (async () => {
      setDocumentA(await readFile(files[0]))
      setDocumentB(await readFile(files[1]))
    })()

  }, [files])

  return (
    <Stack h="100vh" w="100vw" pos="fixed" top={0} left={0} bottom={0} right={0}>
      <AppBar fileState={[files, setFiles]} />
      <JsonDiff documentA={documentA ?? "<EMPTY>"} documentB={documentB ?? "<EMPTY>"}/>
      <Footer />
    </Stack>
  )
}

type FileStateProps = {
  fileState: [FileValidated[], (files: FileValidated[]) => void]
}

const AppBar: React.FC<FileStateProps> = ({ fileState }) => (
  <Stack direction="row" p={4}>
    <Heading as="h1" fontSize="lg">JSON Compare</Heading>
    <Spacer />
    <Box>
      <FileUpload fileState={fileState} />
    </Box>
  </Stack>
)

const FileUpload: React.FC<FileStateProps> = ({ fileState }) => {
  const [files, setFiles] = fileState

  const updateFiles = (incomingFiles: any[]) => {
    setFiles(incomingFiles);
  };

  return (
    <Dropzone onChange={updateFiles} value={files} maxFiles={2} uploadOnDrop>
      {files.map((file, i) => (
        <FileItem key={i} {...file} preview />
      ))}
    </Dropzone>
  );
}

const Footer = Stack