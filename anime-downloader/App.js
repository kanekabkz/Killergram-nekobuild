import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { loadDownloadsFromStorage } from './src/services/downloadService';

export default function App() {
  useEffect(() => {
    // Load previously saved downloads when the app starts
    loadDownloadsFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
