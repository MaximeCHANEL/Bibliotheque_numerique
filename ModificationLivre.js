import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';

export default function ModificationLivre({ navigation }) {
  const [titre, setTitre] = useState('');
  const [auteur, setAuteur] = useState('');
  const [categorie, setCategorie] = useState('');
  const [annee, setAnnee] = useState('');
  const [statut, setStatut] = useState('');
  const [image, setImage] = useState('');

  const db = useSQLiteContext();
  const route = useRoute();
  const id = route.params?.id;

  const [livre, setLivre] = useState(null);

  useEffect(() => {
    if (db && id) {
      afficherLivre(id);
    }
  }, [db, id]);

  const afficherLivre = async (idLivre) => {
    try {
      const result = await db.getAllAsync('SELECT * FROM livre WHERE id_livre = ?', [idLivre]);
      if (result.length > 0) {
        const livreData = result[0];
        setLivre(livreData);
        setTitre(livreData.titre);
        setAuteur(livreData.auteur);
        setCategorie(livreData.categorie);
        setAnnee(String(livreData.annee_publication));
        setStatut(livreData.statut);
        setImage(livreData.image);
      } else {
        Alert.alert('Livre introuvable', 'Aucun livre ne correspond à cet identifiant.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du livre :', error);
      Alert.alert('Erreur', 'Impossible de charger le livre.');
    }
  };

  const handleUpdate = async () => {
    if (!titre || !auteur || !categorie || !annee || !statut || !image) {
      Alert.alert('Champs manquants', 'Merci de remplir tous les champs');
      return;
    }

    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `UPDATE livre SET titre = ?, auteur = ?, categorie = ?, annee_publication = ?, statut = ?, image = ? WHERE id_livre = ?`,
          [titre, auteur, categorie, annee, statut, image, id]
        );
      });

      Alert.alert('Succès', 'Livre mis à jour !');
      navigation.navigate('DetailsLivre', { id });

    } catch (error) {
      console.error('Erreur mise à jour SQLite :', error);
      Alert.alert('Erreur', 'Impossible d’enregistrer les modifications.');
    }
  };

  if (!livre) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chargement du livre...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>
      <View style={styles.containerForm}>
        <Text style={styles.size}>Modification du Livre</Text>
        <StatusBar style="auto" />

        <View style={styles.champs}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Titre :</Text>
            <TextInput style={styles.input} placeholder="Entrez le titre" value={titre} onChangeText={setTitre} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Auteur :</Text>
            <TextInput style={styles.input} placeholder="Entrez l’auteur" value={auteur} onChangeText={setAuteur} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Catégorie :</Text>
            <TextInput style={styles.input} placeholder="Entrez la catégorie" value={categorie} onChangeText={setCategorie} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Année :</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez l’année"
              value={annee}
              onChangeText={setAnnee}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Statut :</Text>
            <TextInput style={styles.input} placeholder="Entrez le statut" value={statut} onChangeText={setStatut} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Image :</Text>
            <TextInput style={styles.input} placeholder="Entrez l’URL de l’image" value={image} onChangeText={setImage} />
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={handleUpdate} style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>Mettre à jour le livre</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    width: 340,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 70,
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 20,
  },
  champs: {
    width: 300,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 30,
  },
  size: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: '500',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  label: {
    width: 100,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    width: '50%',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonTouchable: {
    width: '100%',
    height: 40,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
