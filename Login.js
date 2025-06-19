import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idRole, setIdRole] = useState('');
  const db = useSQLiteContext();

  // Fonction pour vérifier les identifiants
  const handleLogin = async () => {
    try {
      const results = await db.getAllAsync(
        'SELECT * FROM utilisateur WHERE login = ?',
        [email.trim()]
      );

      if (results.length === 0) {
        Alert.alert('Erreur', 'Aucun utilisateur trouvé avec cet identifiant.');
        return;
      }

      const utilisateur = results[0];

      if (utilisateur.mot_de_passe?.trim() === password.trim()) {
      const idRole = utilisateur.id_role;

      // Redirection en fonction du rôle
      switch (idRole) {
        case 1: // admin
          Alert.alert('Succès', 'Bienvenue admin');
          navigation.navigate('Admin');
          break;
        case 2: // utilisateur
          Alert.alert('Succès', 'Bienvenue utilisateur');
          navigation.navigate('Bibliothecaire');
          break;
        case 3: // lecteur
          Alert.alert('Succès', 'Bienvenue lecteur');
          navigation.navigate('Lecteur');
          break;
        default:
          Alert.alert('Erreur', 'Rôle non reconnu.');
      }
    } else {
      Alert.alert('Erreur', 'Mot de passe incorrect.');
    }

    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      Alert.alert('Erreur', 'Une erreur est survenue.');
    }
  };


  return (
    <View style={styles.containerForm}>
      <Text style={styles.size}>Formulaire de connexion</Text>
      <StatusBar style="auto" />
      <View style={styles.champs}>
        <View style={styles.inputGroup}>
          <Text>Email :</Text>
          <TextInput
            style={styles.inputEmail}
            placeholder='Entrez votre email'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType='email-address'
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Mot de passe :</Text>
          <TextInput
            style={styles.inputPassword}
            placeholder='Entrez votre mot de passe'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.button}>
        <Button title="Se connecter" onPress={handleLogin} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Inscription')}
          style={{ width: 160, height: 35, marginRight: 15, marginTop: 10, backgroundColor: '#2196f3', justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 18, color: 'white' }}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    flex: 0,
    width: 325,
    height: 380,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 150,
    marginLeft: 15,
    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  champs: {
    flex: 0,
    width: 300,
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  size: {
    fontSize: 20,
    marginTop: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  inputEmail: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
    marginLeft: 60,
    width: '65%',
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
    marginLeft: 10,
    width: '65%',
  },
  button: {
    width: '50%',
  },
});
