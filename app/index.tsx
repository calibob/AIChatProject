import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Page!</Text>
      <Button title="Go to Chat" onPress={() => router.push("/chat")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
});
