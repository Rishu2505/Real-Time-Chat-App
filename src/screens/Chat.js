import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          }))
          .reverse()
      );
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (msg) => {
    try {
      setInputText("");
      const time = new Date();
      const currentUser = auth.currentUser;
      const { email } = props?.route?.params;
      const docRef = collection(db, "messages");
      await addDoc(docRef, {
        senderId: currentUser.uid,
        message: msg,
        createdAt: time,
        senderEmail: email, // Include user's email
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        {
          alignSelf:
            item.senderId === auth.currentUser.uid ? "flex-end" : "flex-start",
        },
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: item.senderId === auth.currentUser.uid ? "#007bff" : "#B2BEB5",
            borderBottomLeftRadius: item.senderId === auth.currentUser.uid ? 0 : 10,
            borderBottomRightRadius: item.senderId === auth.currentUser.uid ? 10 : 0,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: item.senderId === auth.currentUser.uid ? "white" : "black" },
          ]}
        >
          <Text style={styles.senderEmail}>{item.senderEmail}</Text>
          {"\n"}
          {item.message}
        </Text>
      </View>
      <Text style={{ color: "gray", fontSize: 12, }}>
        {item.createdAt.toLocaleString()}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        inverted
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.inputContainer}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          multiline={true}
        />
        </View>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            if(inputText){
              sendMessage(inputText);
            }else{
              Alert.alert("Please enter a message")
            }
          
          }}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  inputView: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    justifyContent:'center'
  },
  input: {
    textAlignVertical: "center",
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: "80%",
  },
  messageBubble: {
    padding: 10,
    maxWidth: "80%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  senderEmail: {
    fontWeight: "bold",
    marginRight: 5,
    fontStyle:'italic'
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});

export default ChatScreen;
