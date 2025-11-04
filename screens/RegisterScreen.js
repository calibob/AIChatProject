import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import API from "../constants/api";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const res = await API.post("/auth/register", { username, password });
      if (res.data.success) {
        navigation.navigate("login"); // redirige vers LoginScreen
      } else {
        Alert.alert("Erreur", res.data.message);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Erreur", "Impossible de créer un compte");
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
      <Button title="S'inscrire" onPress={register} />
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
