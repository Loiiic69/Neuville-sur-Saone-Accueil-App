import React, { useState, useEffect } from 'react';
import { View, StyleSheet, AppState, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreensaverComponent from './Src/Components/Screensaver';
import HomeScreen from './Src/Screens/homeScreen/HomeScreen';



const Stack = createStackNavigator();
const SCREEN_WIDTH = Dimensions.get('window').width;

const App = () => {
  const [isScreensaverVisible, setScreensaverVisible] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleUserInteraction = () => {
      setLastInteractionTime(Date.now());
      if (isScreensaverVisible) {
        setScreensaverVisible(false);
      }
    };

    const checkInactivity = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastInteractionTime > 30000) { // 30 secondes
        setScreensaverVisible(true);
      }
    }, 1000);

    const appStateListener = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        handleUserInteraction();
      }
      setAppState(nextAppState);
    });

    // Attach touch event listeners to the entire app
    const handleTouch = () => handleUserInteraction();
    const subscription = AppState.addEventListener('change', handleTouch);

    return () => {
      clearInterval(checkInactivity);
      appStateListener.remove();
      subscription.remove();
    };
  }, [lastInteractionTime, isScreensaverVisible]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
      {isScreensaverVisible && (
        <ScreensaverComponent
          onNavigateToHome={() => {
            setScreensaverVisible(false); // Masquer le screensaver
            setLastInteractionTime(Date.now()); // Réinitialiser le temps d'interaction
          }}
        />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
