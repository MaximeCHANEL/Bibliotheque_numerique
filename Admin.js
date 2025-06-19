import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { ScrollView, GestureHandlerRootView  } from 'react-native-gesture-handler';

export default function Admin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>
      <View style={styles.containerForm}>
        <Text>
            <Text style={styles.size}>Bienvenue Administrateur</Text>
        </Text>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  containerForm: {
    flex: 0,
    width: 325,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 15,
  },
  size: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  barreRecherche: {
    height: 40,
    width: 180,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
