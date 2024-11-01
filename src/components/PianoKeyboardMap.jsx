import { Box, Heading, Center, Table, Tbody, Tr, Td } from "@chakra-ui/react";
const PianoKeyboardMap = () => {
  return (
    <>
      {/* keyboard mapping table */}
      <Center mt={4} mb={6}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          bg="white"
          shadow="lg"
        >
          <Heading size="md" mb={4} color="orange.600">
            keyboard map
          </Heading>
          <Table variant="simple" size="sm">
            <Tbody>
              <Tr>
                <Td>A</Td>
                <Td>C4</Td>
              </Tr>
              <Tr>
                <Td>S</Td>
                <Td>D4</Td>
              </Tr>
              <Tr>
                <Td>D</Td>
                <Td>E4</Td>
              </Tr>
              <Tr>
                <Td>F</Td>
                <Td>F4</Td>
              </Tr>
              <Tr>
                <Td>G</Td>
                <Td>G4</Td>
              </Tr>
              <Tr>
                <Td>H</Td>
                <Td>A4</Td>
              </Tr>
              <Tr>
                <Td>J</Td>
                <Td>B4</Td>
              </Tr>
              <Tr>
                <Td>W</Td>
                <Td>C#4</Td>
              </Tr>
              <Tr>
                <Td>E</Td>
                <Td>D#4</Td>
              </Tr>
              <Tr>
                <Td>T</Td>
                <Td>F#4</Td>
              </Tr>
              <Tr>
                <Td>Y</Td>
                <Td>G#4</Td>
              </Tr>
              <Tr>
                <Td>U</Td>
                <Td>A#4</Td>
              </Tr>
              <Tr>
                <Td>K</Td>
                <Td>C5</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Center>
    </>
  );
};

export default PianoKeyboardMap;
