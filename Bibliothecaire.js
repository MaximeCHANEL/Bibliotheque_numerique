import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSQLiteContext } from 'expo-sqlite';

export default function Bibliothecaire({ navigation }) {
  const [id, setId] = useState('');
  const [titre, setTitre] = useState('');
  const [auteur, setAuteur] = useState('');
  const [categorie, setCategorie] = useState('');
  const [annee, setAnnee] = useState('');
  const [statut, setStatut] = useState('');
  const [image, setImage] = useState('');
  

  const db = useSQLiteContext();
  const [livres, setLivres] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [emprunts, setEmprunts] = useState([]);

  useEffect(() => {
    console.log('[DEBUG] useEffect - chargerLivres et chargerReservations déclenché');
    chargerLivres();
    chargerReservations();
    chargerEmprunts();
  }, []);

  const chargerLivres = async () => {
    try {
      const result = await db.getAllAsync('SELECT * FROM livre ORDER BY id_livre DESC');
      console.log('[DEBUG] Livres chargés :', result);
      setLivres(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des livres :', error);
    }
  };

  const chargerReservations = async () => {
    try {
      const result = await db.getAllAsync('SELECT reservation.id_reservation, reservation.date_reservation AS date_reservation, reservation.statut AS statut, reservation.action AS action, utilisateur.prenom AS prenom, livre.titre AS titre FROM reservation INNER JOIN utilisateur ON reservation.id_utilisateur = utilisateur.id_utilisateur INNER JOIN livre ON reservation.id_livre = livre.id_livre');
      console.log('[DEBUG] Réservations chargés :', result);
      setReservations(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations :', error);
    }
  };

  const chargerEmprunts = async () => {
    try {
      const result = await db.getAllAsync('SELECT emprunt.id_emprunt, emprunt.date_emprunt AS date_emprunt, emprunt.date_retour_prevue AS date_retour_prevue, emprunt.date_retour_reelle AS date_retour_reelle, utilisateur.prenom AS prenom, livre.titre AS titre FROM emprunt INNER JOIN utilisateur ON emprunt.id_utilisateur = utilisateur.id_utilisateur INNER JOIN livre ON emprunt.id_livre = livre.id_livre');
      console.log('[DEBUG] Emprunts chargés :', result);
      setEmprunts(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des emprunts :', error);
    }
  };

  const handleChangerAction = async (idReservation, actionActuelle) => {
    if (!idReservation) {
      console.error('❌ idReservation non valide');
      return;
    }

    // Détermine la nouvelle action
    const nouvelleAction = actionActuelle === 'approuvé' ? 'refusé' : 'approuvé';

    try {
      await db.runAsync(
        `UPDATE reservation SET action = ? WHERE id_reservation = ?`,
        [nouvelleAction, idReservation]
      );

      // Rechargement
      const result = await db.getAllAsync(`
        SELECT reservation.id_reservation,
              reservation.date_reservation,
              reservation.statut,
              reservation.action,
              utilisateur.prenom,
              livre.titre
        FROM reservation
        INNER JOIN utilisateur ON reservation.id_utilisateur = utilisateur.id_utilisateur
        INNER JOIN livre ON reservation.id_livre = livre.id_livre
      `);
      setReservations(result);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'action :', error);
    }
  };

  const handleInsert = async () => {
    if (!titre || !auteur || !categorie || !annee || !statut || !image) {
      Alert.alert('Champs manquants', 'Merci de remplir tous les champs');
      return;
    }

    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `INSERT INTO livre (titre, auteur, categorie, annee_publication, statut, image) VALUES (?, ?, ?, ?, ?, ?)`,
          [titre, auteur, categorie, annee, statut, image]
        );
      });

      Alert.alert('Succès', 'Livre ajouté !');

      setTitre('');
      setAuteur('');
      setCategorie('');
      setAnnee('');
      setStatut('');
      setImage('');

      chargerLivres();

    } catch (error) {
      console.error('Erreur insertion SQLite :', error);
      Alert.alert('Erreur', 'Impossible d’enregistrer le livre.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>
      <Text style={styles.title}>Bienvenue Bibliothécaire</Text>

      <View style={styles.containerForm}>
        <Text style={styles.size}>Ajout de livres</Text>
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
            <TextInput style={styles.input} placeholder="URL de l’image" value={image} onChangeText={setImage} />
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={handleInsert} style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>Ajouter le livre</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerForm}>
        <Text style={styles.titleRes}>Liste des réservations</Text>

        <View style={styles.header}>
          <Text style={[styles.cell, styles.date]}>Date</Text>
          <Text style={[styles.cell, styles.statut]}>Statut</Text>
          <Text style={[styles.cell, styles.user]}>Utilisateur</Text>
          <Text style={[styles.cell, styles.titre]}>Livre</Text>
          <Text style={[styles.cell, styles.action]}>Action</Text>
        </View>

        {reservations.map((reservation, index) => {
          console.log('[DEBUG] reservation:', reservation);
          return (
            <View key={index} style={styles.row}>
              <Text style={[styles.cell, styles.date]}>{reservation.date_reservation}</Text>
              <Text style={[styles.cell, styles.statut]}>{reservation.statut}</Text>
              <Text style={[styles.cell, styles.user]}>{reservation.prenom}</Text>
              <Text style={[styles.cell, styles.titre]}>{reservation.titre}</Text>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() =>
                    handleChangerAction(reservation.id_reservation, reservation.action)
                  }
                >
                  <Text
                    style={[
                      styles.cell,
                      reservation.action === 'approuvé' ? styles.approveBtn : styles.rejectBtn,
                    ]}
                  >
                    {reservation.action === 'approuvé' ? '✅ Approuvé' : '❌ Refusé'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.containerForm}>
        <Text style={styles.titleRes}>Liste des emprunts</Text>

        <View style={styles.header}>
          <Text style={[styles.cell, styles.date]}>Date Emprunt</Text>
          <Text style={[styles.cell, styles.statut]}>Date Retour</Text>
          <Text style={[styles.cell, styles.user]}>Date Retour Réel</Text>
          <Text style={[styles.cell, styles.titre]}>Utilisateur</Text>
          <Text style={[styles.cell, styles.action]}>Livre</Text>
        </View>

        {emprunts.map((emprunt, index) => {
          console.log('[DEBUG] emprunt:', emprunt);
          return (
            <View key={index} style={styles.row}>
              <Text style={[styles.cell, styles.date_emprunt]}>{emprunt.date_emprunt}</Text>
              <Text style={[styles.cell, styles.date_retour_prevue]}>{emprunt.date_retour_prevue}</Text>
              <Text style={[styles.cell, styles.date_retour_reelle]}>{emprunt.date_retour_reelle}</Text>
              <Text style={[styles.cell, styles.user]}>{emprunt.prenom}</Text>
              <Text style={[styles.cell, styles.titre]}>{emprunt.titre}</Text>
            </View>
          );
        })}
      </View>


      <View style={styles.containerForm}>
        <Text style={styles.titleRes}>Catalogue de Livres</Text>

        <View>
          {livres.map((livre) => (
            <TouchableOpacity
              key={livre.id_livre.toString()}
              onPress={() => {
                console.log('[DEBUG] Navigation vers DetailsLivre avec ID :', livre.id_livre);
                navigation.navigate('DetailsLivre', { id: livre.id_livre });
              }}
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
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: '600',
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
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  titleRes: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 25,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#ccc',
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: {
    fontSize: 14,
    paddingHorizontal: 4,
  },
  date: {
    width: 85,
  },
  statut: {
    width: 85,
  },
  user: {
    flex: 1,
  },
  titre: {
    flex: 1.2,
  },
  action: {
  width: 65,
  textAlign: 'center',
  },
  actionBtn: {
    width: 65,
    color: 'red',
    textAlign: 'center',
  },
  approveBtn: {
  color: 'green',
  fontWeight: 'bold',
  marginHorizontal: 4,
  },
  rejectBtn: {
    color: 'red',
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  date_emprunt: {
    width: 85,
  },
  date_retour_prevue: {
    width: 85,
  },
  date_retour_reelle: {
    width: 85,
  },
  user: {
    flex: 1,
  },
  titre: {
    flex: 1.2,
  },
});
