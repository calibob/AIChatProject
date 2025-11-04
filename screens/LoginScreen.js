import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import API from "../constants/api";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { username, password });
      if (res.data.success) {
        navigation.navigate("chat"); // redirige vers ChatScreen
      } else {
        Alert.alert("Erreur", res.data.message);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Erreur", "Impossible de se connecter");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Se connecter" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});
