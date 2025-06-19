import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

export default function DetailsLivre() {
  const db = useSQLiteContext();
  const route = useRoute();
  console.log('route.params:', route.params);
  const id = route.params?.id;
  console.log('id récupéré:', id);
  const navigation = useNavigation();



  const [livre, setLivre] = useState(null); // Un seul livre

  useEffect(() => {
    console.log('[DEBUG] useEffect - id reçu :', id);
    if (db && id) {
      afficherLivre(id);
    }
  }, [db, id]);


  const afficherLivre = async (idLivre) => {
    try {
      console.log('[DEBUG] Requête SQL pour ID :', idLivre);
      const result = await db.getAllAsync('SELECT * FROM livre WHERE id_livre = ?', [idLivre]);
      console.log('[DEBUG] Résultat SQL :', result);

      if (result.length > 0) {
        setLivre(result[0]);
      } else {
        Alert.alert('Livre introuvable', 'Aucun livre ne correspond à cet identifiant.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du livre :', error);
      Alert.alert('Erreur', 'Impossible de charger le livre.');
    }
  };

  const handleDelete = async () => {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `DELETE FROM livre WHERE id_livre = ?`,
          [id]
        );
      });

      Alert.alert('Succès', 'Livre supprimé !');
      navigation.navigate('Bibliothecaire');

    } catch (error) {
      console.error('Erreur suppression SQLite :', error);
      Alert.alert('Erreur', 'Impossible de supprimer le livre.');
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
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      
      <Image
        source={{ uri: livre.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>Le titre du livre est : {livre.titre}</Text>
      <Text style={styles.details}>L'auteur du livre se nomme : {livre.auteur}</Text>
      <Text style={styles.details}>Le genre de ce livre est : {livre.categorie}</Text>
      <Text style={styles.details}>Ce livre est paru en : {livre.annee_publication}</Text>
      <Text style={styles.details}>Ce livre est : {livre.statut}</Text>

      {/* <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Emprunter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Réserver</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.row}>
        <TouchableOpacity onPress={handleDelete} style={styles.button}>
          <Text style={styles.buttonText}>Supprimer le livre</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log('[DEBUG] Navigation vers ModificationLivre avec ID :', livre.id_livre);
            navigation.navigate('ModificationLivre', { id: livre.id_livre });
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Modifier le livre</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Bibliothecaire');
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Retour au catalogue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 30,
  },
  image: {
    width: 300,
    height: 500,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  details: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    minWidth: 130,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
