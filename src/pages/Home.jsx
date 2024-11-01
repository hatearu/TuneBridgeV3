import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Icon,
  Flex,
  Divider,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdMusicNote } from "react-icons/md";

const Home = () => {
  const navigate = useNavigate();
  const [highScoreGame1, setHighScoreGame1] = useState(0); // Pitch Perfect 최고 점수
  const [savedHarmonyStep, setSavedHarmonyStep] = useState(0); // Harmony Builder 클리어한 단계

  // 컴포넌트가 렌더링될 때 localStorage에서 최고 점수 및 클리어한 단계를 불러옴
  useEffect(() => {
    const savedHighScore = localStorage.getItem("pitchPerfectHighScore");
    if (savedHighScore) {
      setHighScoreGame1(Number(savedHighScore));
    }
    const savedStep = localStorage.getItem("harmonyBuilderStep");
    if (savedStep) {
      setSavedHarmonyStep(Number(savedStep));
    }
  }, []);

  return (
    <Box p={6} textAlign="center" bg="gray.100" minHeight="100vh">
      <Heading mb={2} color="teal.700">
        TuneBridge
      </Heading>
      <Text mb={8} color="gray.500">
        Discover the joy of learning music with interactive games.
      </Text>

      <VStack spacing={6} mb={8}>
        <Box
          w="100%"
          maxW="400px"
          bg="white"
          p={6}
          shadow="md"
          borderRadius="md"
          border="1px solid"
          borderColor="teal.300"
        >
          <Heading size="md" mb={2} color="teal.700">
            Pitch Perfect
          </Heading>
          <Text color="gray.600">best score: {highScoreGame1}</Text>
          <Divider my={4} borderColor="teal.100" />
          <Button colorScheme="teal" onClick={() => navigate("/pitch-perfect")}>
            Start Game
          </Button>
        </Box>

        <Box
          w="100%"
          maxW="400px"
          bg="white"
          p={6}
          shadow="md"
          borderRadius="md"
          border="1px solid"
          borderColor="orange.300"
        >
          <Heading size="md" mb={2} color="orange.600">
            Harmony Builder
          </Heading>
          <Text color="gray.600">
            cleared stages:{" "}
            {savedHarmonyStep > 0 ? `${savedHarmonyStep} stage` : "not yet"}
          </Text>
          <Divider my={4} borderColor="orange.100" />
          <Button
            colorScheme="orange"
            onClick={() => navigate("/harmony-builder")}
          >
            Start Game
          </Button>
        </Box>
      </VStack>

      {/* 피아노 이미지 */}
      <Box mt={4} px={4}>
        <Image
          src="https://plus.unsplash.com/premium_photo-1726812132514-ff13bbcc39af?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGlhbm8lMjBtdXNpY3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Piano Keyboard"
          borderRadius="md"
          boxShadow="md"
          maxW="280px"
          mx="auto"
          mb={8}
        />

        {/* 음악 노트 아이콘 */}
        <Flex justifyContent="center" color="gray.400" mb={4}>
          <Icon as={MdMusicNote} boxSize={6} mr={1} />
          <Icon as={MdMusicNote} boxSize={8} mx={1} />
          <Icon as={MdMusicNote} boxSize={6} ml={1} />
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
