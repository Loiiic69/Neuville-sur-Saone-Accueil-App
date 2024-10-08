import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavBar from '../../Components/header';
import BackgroundImage from '../../Components/backgroundhome';
import CarouselComponent from '../../Components/carousel';
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackgroundImage>
        <NavBar navigation={navigation} />
        <View style={styles.content}>
          {/* Ajoutez ici le contenu principal de votre écran */}
        </View>
        <View style={styles.carousel}>
          <CarouselComponent />
        </View>
      </BackgroundImage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 0,
    margin: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;
