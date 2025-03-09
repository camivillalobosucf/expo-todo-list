import React from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { useFonts, DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { StatusBar } from 'expo-status-bar';  // <-- Importar expo-status-bar
import TodoScreen from './components/TodoScreen';

export default function App() {
  let [fontsLoaded] = useFonts({
    DMSans_Regular: DMSans_400Regular,
    DMSans_Bold: DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />  {/* <-- Asegurar que la barra de estado se muestre */}
      <TodoScreen />
    </SafeAreaView>
  );
}
