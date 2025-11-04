import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageBubble({ message }) {
  const isBot = message.sender === 'bot';
  return (
    <View style={[styles.bubble, isBot ? styles.bot : styles.user]}>
      <Text style={styles.text}>{message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  user: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  bot: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
  },
});
