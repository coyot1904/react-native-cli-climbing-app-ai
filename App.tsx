import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ChatScreenPage from './src/Screens/Chat';
import MapScreenPage from './src/Screens/Map';
import TrackScreenPage from './src/Screens/Track';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Chat" component={ChatScreenPage} />
          <Stack.Screen name="Map" component={MapScreenPage} />
          <Stack.Screen name="Track" component={TrackScreenPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
