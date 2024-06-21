import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import NavBar from '../../Components/header';
import BackgroundImage from '../../Components/backgroundhome';
import CarouselComponent from '../../Components/carousel';
import Footer from '../../Components/footer';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <BackgroundImage>
        <NavBar />
        <View style={styles.content}>
                </View>
                <View style={styles.carousel}>
        <CarouselComponent />
      </View>
      </BackgroundImage>
      <Footer />


  
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  tabletTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;
