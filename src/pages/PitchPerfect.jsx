import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  IconButton,
  HStack,
  Center,
  Switch,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Tone from "tone";

const PitchPerfect = () => {
  const navigate = useNavigate();
  const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
  const [currentNote, setCurrentNote] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("pitchPerfectHighScore")) || 0
  );
  const [message, setMessage] = useState("Listen and match the pitch!");
  const [selectedNote, setSelectedNote] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [attempt, setAttempt] = useState(1); // Attempt count
  const synth = new Tone.Synth().toDestination();
  const cancelRef = useRef();

  useEffect(() => {
    if (!currentNote) {
      generateNewNote(); // Generate a random note at the start
    }
  }, [attempt]); // Generate a new note when attempt is reset

  // Update high score in local storage
  const updateHighScore = (newScore) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem("pitchPerfectHighScore", newScore); // Save in local storage
    }
  };

  // Function to randomly select and play a note
  const generateNewNote = () => {
    const note = testMode
      ? "C4"
      : notes[Math.floor(Math.random() * notes.length)];
    setCurrentNote(note);
    setSelectedNote(null);
    setShowCorrect(false);
  };

  const playCurrentNote = async () => {
    await Tone.start();
    synth.triggerAttackRelease(currentNote, "8n");
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);

    if (note === currentNote) {
      setMessage("Correct!");
      setScore(score + 1);
      setShowCorrect(false);
      generateNewNote(); // 정답일 때 새로운 음 생성
    } else {
      setMessage(`Incorrect! The correct note was ${currentNote}.`);
      setShowCorrect(true);
      endGame();
    }
  };

  // End game function
  const endGame = () => {
    updateHighScore(score); // Update high score
    setTimeout(() => {
      setIsGameOver(true);
    }, 2000);
  };

  const handleRetry = () => {
    setScore(0);
    setMessage("Listen and match the pitch!");
    setAttempt(attempt + 1); // Increase attempt count
    setIsGameOver(false);
    generateNewNote();
  };

  return (
    <Box maxW="400px" mx="auto" p={4}>
      {/* Header */}
      <HStack justifyContent="space-between" mb={6}>
        <IconButton
          aria-label="Back to Home"
          icon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          colorScheme="teal"
          variant="outline"
        />
        <Heading size="lg" color="teal.700">
          Pitch Perfect
        </Heading>
      </HStack>

      {/* Test Mode Switch */}
      <HStack mb={4} justifyContent="center">
        <Text>Test Mode (C Note Only):</Text>
        <Switch
          isChecked={testMode}
          onChange={() => setTestMode(!testMode)}
          colorScheme="teal"
        />
      </HStack>

      {/* Attempt Display */}
      <Text fontSize="md" fontWeight="bold" color="teal.600" mb={2}>
        Attempt: {attempt}
      </Text>

      {/* Score Display */}
      <Box mb={4} bg="teal.50" borderRadius="md" p={3} shadow="md">
        <Text fontSize="lg" fontWeight="bold" color="teal.700">
          Current Score: {score} | High Score: {highScore}
        </Text>
      </Box>

      {/* Play Note Button */}
      <Button
        colorScheme="blue"
        onClick={playCurrentNote}
        mb={6}
        size="lg"
        w="full"
        shadow="md"
        isDisabled={isGameOver}
      >
        Play Note
      </Button>

      {/* Note Buttons */}
      <VStack spacing={4} align="center">
        {notes.map((note) => (
          <Button
            key={note}
            colorScheme={"green"}
            onClick={() => handleNoteClick(note)}
            isDisabled={selectedNote && note !== currentNote && showCorrect}
            variant="outline"
            size="lg"
            w="80%"
            borderRadius="full"
          >
            {note}
          </Button>
        ))}
      </VStack>

      {/* Message Display */}
      <Center
        mt={6}
        p={4}
        bg={showCorrect ? "red.50" : "teal.50"}
        borderRadius="md"
        shadow="md"
      >
        <Text fontSize="xl" color={showCorrect ? "red.500" : "green.500"}>
          {message}
        </Text>
      </Center>

      {/* Game Over Dialog */}
      <AlertDialog
        isOpen={isGameOver}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsGameOver(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Game Over
            </AlertDialogHeader>
            <AlertDialogBody>
              {`High Score: ${highScore} points!`}
              <br />
              Would you like to try again?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => navigate("/")}>
                Back to Home
              </Button>
              <Button colorScheme="teal" onClick={handleRetry} ml={3}>
                Retry
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default PitchPerfect;
