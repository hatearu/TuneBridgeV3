import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  Heading,
  Center,
  HStack,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Collapse,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import * as Tone from "tone";
import PianoKeyboardMap from "../components/PianoKeyboardMap"; // Keyboard mapping component

const HarmonyBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userNotes, setUserNotes] = useState([]);
  const [confirmedSteps, setConfirmedSteps] = useState([]); // Track confirmed steps
  const [showKeyboardMap, setShowKeyboardMap] = useState(false); // Toggle keyboard map visibility
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const steps = [
    {
      notes: ["C4", "E4", "G4"],
      guide: "Play C4, E4, and G4! (Consonant)",
      message: "Sounds harmonious, doesn't it?",
    },
    {
      notes: ["C4", "F#4", "G4"],
      guide: "Play C4, F#4, and G4! (Dissonant)",
      message: "Feels a bit unstable, right?",
    },
    {
      notes: ["F4", "A4", "C5"],
      guide: "Play F4, A4, and C5! (Consonant)",
      message: "Sounds harmonious, doesn't it?",
    },
    {
      notes: ["D4", "F#4", "A#4"],
      guide: "Play D4, F#4, and A#4! (Dissonant)",
      message: "Feels a bit unstable, right?",
    },
    {
      notes: [],
      guide: "Create your own chord freely!",
      message: "Congratulations! You've completed Harmony Builder!",
    },
  ];

  const firstNote = MidiNumbers.fromNote("C4");
  const lastNote = MidiNumbers.fromNote("C5");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  const playSelectedNotes = async () => {
    const synth = new Tone.PolySynth().toDestination();
    await Tone.start();
    synth.triggerAttackRelease(userNotes, "8n");
    onOpen();

    // Save completion progress for each step
    if (currentStep === steps.length) {
      localStorage.setItem("harmonyBuilderStep", currentStep); // Completion progress for the final step
    } else if (currentStep < steps.length) {
      localStorage.setItem("harmonyBuilderStep", currentStep);
    }

    // Mark the current step as confirmed
    setConfirmedSteps([...confirmedSteps, currentStep]);
  };

  const handleNextStep = () => {
    // Enable next step only if the current step is confirmed
    if (currentStep < steps.length && confirmedSteps.includes(currentStep)) {
      setCurrentStep(currentStep + 1);
      setUserNotes([]);
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setUserNotes([]);
      onClose();
    }
  };

  return (
    <Box
      p={4}
      textAlign="center"
      bg="orange.100"
      height="100vh"
      overflowY="hidden"
    >
      {/* Header */}
      <HStack justifyContent="space-between" mb={2}>
        <IconButton
          aria-label="Back to Home"
          icon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          colorScheme="orange"
          variant="outline"
          size="sm"
        />
        <Heading size="md" color="orange.700">
          Harmony Builder - Step {currentStep}
        </Heading>
      </HStack>

      <Text mb={2} color="gray.700" fontSize="md">
        {steps[currentStep - 1].guide}
      </Text>

      {/* Piano Keyboard */}
      <Center mb={3} width="100%">
        <Box display="flex" justifyContent="center" width="100%">
          <div>
            <Piano
              noteRange={{ first: firstNote, last: lastNote }}
              playNote={(midiNumber) => {
                const note = MidiNumbers.getAttributes(midiNumber).note;
                setUserNotes((prev) => [...prev, note]);
                const synth = new Tone.Synth().toDestination();
                synth.triggerAttackRelease(note, "8n");
              }}
              stopNote={(midiNumber) => {
                const note = MidiNumbers.getAttributes(midiNumber).note;
                setUserNotes((prev) => prev.filter((n) => n !== note));
              }}
              width={300}
              keyboardShortcuts={keyboardShortcuts}
            />
          </div>
        </Box>
      </Center>

      {/* Toggleable Keyboard Mapping Table */}
      <Button
        colorScheme="orange"
        variant="outline"
        size="sm"
        onClick={() => setShowKeyboardMap(!showKeyboardMap)}
        mb={2}
      >
        {showKeyboardMap ? "Hide Keyboard Map" : "Show Keyboard Map"}
      </Button>
      <Collapse in={showKeyboardMap}>
        <PianoKeyboardMap />
      </Collapse>

      {/* Confirmation and Navigation Buttons */}
      <VStack spacing={2} mt={2}>
        <Button colorScheme="orange" size="lg" onClick={playSelectedNotes}>
          {currentStep === steps.length ? "Finish" : "Confirm"}
        </Button>

        <HStack spacing={2}>
          <Button
            onClick={handlePrevStep}
            colorScheme="orange"
            variant="outline"
            size="sm"
            isDisabled={currentStep === 1}
          >
            Previous Step
          </Button>
          <Button
            onClick={handleNextStep}
            colorScheme="orange"
            variant="outline"
            size="sm"
            isDisabled={!confirmedSteps.includes(currentStep)}
          >
            Next Step
          </Button>
        </HStack>
      </VStack>

      {/* Chord Confirmation Popup */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {currentStep === steps.length
                ? "Completed"
                : "Chord Confirmation"}
            </AlertDialogHeader>
            <AlertDialogBody>{steps[currentStep - 1].message}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
              {currentStep < steps.length && (
                <Button colorScheme="orange" onClick={handleNextStep} ml={3}>
                  Next Step
                </Button>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default HarmonyBuilder;
