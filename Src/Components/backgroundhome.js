import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

// Importez votre image de fond ici
import backgroundImage from '../Assets/pont.png';

const BackgroundImage = ({ children }) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '39%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackgroundImage;
