import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  Text,
  Heading,
} from "@chakra-ui/react";

const HandleDataEx = () => {
  // 상태 관리
  const [data, setData] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Firestore에서 데이터 읽기
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "test-collection"));
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Firestore에 데이터 쓰기
  const addData = async () => {
    try {
      const docRef = await addDoc(collection(db, "test-collection"), {
        name: newName,
        description: newDescription,
      });
      console.log("Document written with ID: ", docRef.id);
      fetchData(); // 데이터 추가 후 다시 읽기
      setNewName(""); // 입력 필드 초기화
      setNewDescription("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 Firestore 데이터 읽기
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box p={4} maxW="600px" mx="auto">
      <Heading mb={4}>Firebase Firestore Example</Heading>

      {/* 입력 필드 */}
      <Input
        placeholder="Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        mb={2}
      />
      <Input
        placeholder="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        mb={4}
      />
      <Button colorScheme="teal" onClick={addData} mb={4}>
        Add Data
      </Button>

      {/* 데이터 목록 */}
      <Heading as="h2" size="md" mb={2}>
        Data from Firestore:
      </Heading>
      <List spacing={3}>
        {data.map((item) => (
          <ListItem key={item.id} p={2} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">{item.name}</Text>
            <Text>{item.description}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HandleDataEx;
