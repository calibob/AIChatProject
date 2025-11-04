// frontend/app/chat/index.tsx
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import API from '../../constants/api';
import MessageBubble from '../../components/MessageBubble';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  // Récupérer tous les messages
  const fetchMessages = async () => {
    try {
      const res = await API.get('/chat');
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Envoyer un message
  const sendMessage = async () => {
    if (!text) return;

    try {
      const res = await API.post('/chat/send', { sender: 'user', text });
      setMessages([...messages, res.data]); // ajoute la réponse du bot
      setText('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <MessageBubble message={item} />}
      />
      <TextInput
        style={styles.input}
        placeholder="Écrire un message..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Envoyer" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginVertical: 10 },
});
