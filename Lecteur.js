import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSQLiteContext } from 'expo-sqlite';

export default function Lecteur({ navigation }) {
  const db = useSQLiteContext();
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    if (db) {
      console.log('[DEBUG] useEffect - chargerLivres déclenché');
      chargerLivres();
    }
  }, [db]);
  
    const chargerLivres = async () => {
      try {
        const result = await db.getAllAsync('SELECT * FROM livre ORDER BY id_livre DESC');
        setLivres(result);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error);
        Alert.alert('Erreur', 'Impossible de charger les livres.');
      }
    };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>
      <View style={styles.containerForm}>
        <TextInput
          style={styles.barreRecherche}
          placeholder="🔍 Rechercher un livre..."
        />

        <Text style={styles.size}>Catalogue de Livres</Text>
        
        <View>
          {livres.map((livre) => (
            <TouchableOpacity
              key={livre.id_livre.toString()}
              onPress={() => navigation.navigate('DetailsLivre', { livre })}
              style={{ marginBottom: 20, alignItems: 'center' }}
            >
              {livre.image ? (
                <Image source={{ uri: livre.image }} style={{ width: 200, height: 300, borderRadius: 8 }} resizeMode="cover" />
              ) : (
                <View style={{ width: 200, height: 300, backgroundColor: '#ccc' }} />
              )}
              <Text style={{ textAlign: 'center', marginTop: 5, fontWeight: 'bold' }}>{livre.titre}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
