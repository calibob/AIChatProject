// frontend/screens/ChatScreen.js
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import API from '../constants/api.js';

export default function ChatScreen() {
const [messages, setMessages] = useState([]);
const [text, setText] = useState('');
const flatListRef = useRef();

// Charger les messages existants au démarrage
useEffect(() => {
fetchMessages();
}, []);

const fetchMessages = async () => {
try {
const res = await API.get('/chat');
setMessages(res.data);
} catch (err) {
console.error(err);
Alert.alert("Erreur", "Impossible de charger les messages.");
}
};

const sendMessage = async () => {
if (!text.trim()) return;

```
// Message utilisateur ajouté localement
const userMessage = { _id: Date.now().toString(), sender: 'user', text };
setMessages(prev => [...prev, userMessage]);
setText('');

try {
  const res = await API.post('/chat/send', { sender: 'user', text });
  const botMessage = res.data.botMessage;
  setMessages(prev => [...prev, botMessage]); // Ajout du bot seulement
} catch (err) {
  console.error(err);
  Alert.alert("Erreur", "Impossible d'envoyer le message.");
}
```

};

return ( <View style={styles.container}>
<FlatList
ref={flatListRef}
data={messages}
keyExtractor={(item) => item._id}
renderItem={({ item }) => (
<View
style={[
styles.messageContainer,
item.sender === 'bot' ? styles.botMessage : styles.userMessage
]}
> <Text style={styles.sender}>{item.sender === 'bot' ? 'Bot' : 'Vous'}:</Text> <Text style={styles.text}>{item.text}</Text> </View>
)}
onContentSizeChange={() =>
flatListRef.current?.scrollToEnd({ animated: true })
}
/>

```
  <View style={styles.inputContainer}>
    <TextInput
      value={text}
      onChangeText={setText}
      placeholder="Écrire un message..."
      style={styles.input}
    />
    <Button title="Envoyer" onPress={sendMessage} />
  </View>
</View>
```

);
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 10, backgroundColor: '#fff' },
messageContainer: { marginVertical: 5, padding: 10, borderRadius: 8 },
userMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
botMessage: { backgroundColor: '#ECECEC', alignSelf: 'flex-start' },
sender: { fontWeight: 'bold', marginBottom: 2 },
text: { fontSize: 16 },
inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginRight: 10 }
});
