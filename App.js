import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView  } from 'react-native-gesture-handler';
import { initDB } from './database/db';

import Login from './Login';
import DetailsLivre from './DetailsLivre';
import Inscription from './Inscription';
import Lecteur from './Lecteur';
import Bibliothecaire from './Bibliothecaire';
import ModificationLivre from './ModificationLivre';
import Admin from './Admin';
import { SQLiteProvider } from 'expo-sqlite';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SQLiteProvider databaseName="bibliothequeNum.db" onInit={initDB}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Lecteur" component={Lecteur} />
            <Stack.Screen name="DetailsLivre" component={DetailsLivre} />
            <Stack.Screen name="Inscription" component={Inscription} />
            <Stack.Screen name="Bibliothecaire" component={Bibliothecaire} />
            <Stack.Screen name="ModificationLivre" component={ModificationLivre} />
            <Stack.Screen name="Admin" component={Admin} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}