import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AppContainer from "./components/AppContainer";
import {
  Box,
  Checkbox,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  VStack,
  Text,
  Center,
  NativeBaseProvider,
  Select,
  CheckIcon,
} from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";
import CalculateSets from "./utils/CalculateSets";

interface Set {
  weight: number;
  reps: number;
}

interface Warmup {
  warmup: Set[];
}

export default function App() {
  const [exercise, setExercise] = React.useState("");
  const warmupSets = Array<Set>();
  const [warmup, setWarmup] = React.useState(warmupSets);
  const [workingSetWeight, setWorkingSetWeight] = React.useState(0);

  const addItem = (weight: number, reps: number) => {
    setWarmup([
      ...warmup,
      {
        weight: weight,
        reps: reps,
      },
    ]);
  };

  const handleDelete = (index: number) => {
    const temp = warmup.filter((_, itemI) => itemI !== index);
    setWarmup(temp);
  };

  const calculateWarmup = (exercise: string, workingSetWeight: number) => {
      setWarmup(CalculateSets({exercise, workingSetWeight}).warmup);
  }

  // const handleStatusChange = (index: number) => {
  //   const temp = warmup.map((item, itemI) =>
  //     itemI !== index ? item : { ...item, isCompleted: !item.isCompleted }
  //   );
  //   setWarmup(temp);
  // };
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Box w="100%" >
          <Heading mb="5">Select Exercise</Heading>
          <VStack space={4}>
            <Select
                selectedValue={exercise}
                minWidth="200"
                accessibilityLabel="Choose Exercise"
                placeholder="Choose Exercise"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(exercise) => setExercise(exercise)}
              >
                <Select.Item label="Bench Press" value="bench" />
                <Select.Item label="Squat" value="squat" />
                <Select.Item label="Deadlift" value="deadlift" />
                
              </Select>

              <HStack space={2}>
              
              <Input
                flex={1}
                onChangeText={(v) => setWorkingSetWeight(parseInt(v))}
                value={workingSetWeight.toString()}
                placeholder="Enter Working Set Weight"
              />
              <IconButton
                borderRadius="sm"
                variant="solid"
                icon={
                  <Icon
                    as={Feather}
                    name="activity"
                    size="sm"
                    color="warmGray.50"
                  />
                }
                onPress={() => {
                  calculateWarmup(exercise, workingSetWeight);
                  setWorkingSetWeight(0);
                }}
              />
            </HStack>
            <VStack space={2}>
              {warmup.map((set, itemI) => (
                <HStack
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  key={set.weight + itemI.toString()}
                >
                  <Checkbox
                    // isChecked={set.isCompleted}
                    // onChange={() => handleStatusChange(itemI)}
                     //value={set.weight.toString()}
                     value="true"
                  >
                    <Text
                      mx="2"
                      // strikeThrough={set.isCompleted}
                      _light={{
                        // color: set.isCompleted ? "gray.400" : "coolGray.800",
                        color: "gray.800"
                      }}
                      _dark={{
                        // color: set.isCompleted ? "gray.400" : "coolGray.50",
                        color: "coolGray.50"
                      }}
                    >
                      {set.weight}
                    </Text>
                  </Checkbox>
                  <IconButton
                    size="sm"
                    colorScheme="trueGray"
                    icon={
                      <Icon
                        as={Entypo}
                        name="minus"
                        size="xs"
                        color="trueGray.400"
                      />
                    }
                    onPress={() => handleDelete(itemI)}
                  />
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
