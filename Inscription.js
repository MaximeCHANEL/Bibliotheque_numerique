import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

export default function Inscription({ navigation }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [ville, setVille] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const db = useSQLiteContext();

  const handleInsert = async () => {
    if (!nom || !prenom || !ville || !login || !password) {
      Alert.alert('Champs manquants', 'Merci de remplir tous les champs');
      return;
    }

    let role = 3; // Par défaut : Lecteur
    if (login === 'admin@gmail.com') {
      role = 1; // Admin
    } else if (login === 'bibliothecaire@gmail.com') {
      role = 2; // Bibliothécaire
    }

    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `INSERT INTO utilisateur (nom, prenom, ville, login, mot_de_passe, id_role) VALUES (?, ?, ?, ?, ?, ?)`,
          [nom, prenom, ville, login, password, role]
        );
      });

      Alert.alert('Succès', 'Utilisateur enregistré !');
      navigation.navigate('Login');

      // Réinitialiser les champs
      setNom('');
      setPrenom('');
      setVille('');
      setLogin('');
      setPassword('');
    } catch (error) {
      console.error('Erreur insertion SQLite :', error);
      Alert.alert('Erreur', 'Impossible d’enregistrer l’utilisateur.');
    }
  };

  return (
    <View style={styles.containerForm}>
      <Text style={styles.size}>Formulaire d'inscription</Text>
      <StatusBar style="auto" />
      <View style={styles.champs}>
        <View style={styles.inputGroup}>
          <Text>Nom :</Text>
          <TextInput
            style={styles.inputNom}
            placeholder='Entrez votre nom'
            value={nom}
            onChangeText={setNom}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Prénom :</Text>
          <TextInput
            style={styles.inputPrenom}
            placeholder='Entrez votre prénom'
            value={prenom}
            onChangeText={setPrenom}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Ville :</Text>
          <TextInput
            style={styles.inputVille}
            placeholder='Entrez votre ville'
            value={ville}
            onChangeText={setVille}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Email :</Text>
          <TextInput
            style={styles.inputEmail}
            placeholder='Entrez votre email'
            value={login}
            onChangeText={setLogin}
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
        <TouchableOpacity
          onPress={handleInsert}
          style={{
            width: 160,
            height: 35,
            marginRight: 15,
            marginTop: 40,
            backgroundColor: '#2196f3',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18, color: 'white' }}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    flex: 0,
    width: 325,
    height: 540,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 100,
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 30,
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
  inputNom: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 62,
    width: '65%',
  },
  inputPrenom: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 43,
    width: '65%',
  },
  inputVille: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 67,
    width: '65%',
  },
  inputEmail: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 60,
    width: '65%',
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 10,
    width: '65%',
  },
  button: {
    width: '50%',
    marginTop: 20,
  },
});
