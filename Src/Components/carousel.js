import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Button, Linking } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth } = Dimensions.get('window');

// Importez des images locales ici
const images = [
  { uri: require('../Assets/slider1.png'), url: 'https://www.mairie-neuvillesursaone.fr' },
  { uri: require('../Assets/slider2.png'), url: 'https://passeport.ants.gouv.fr/demarches-en-ligne/faire-une-premiere-demande-de-carte-nationale-d-identite' },
  { uri: require('../Assets/slider3.png'), url: 'https://passeport.ants.gouv.fr/demarches-en-ligne/faire-une-premiere-demande-de-passeport' },
  { uri: require('../Assets/slider4.png'), url: 'https://www.service-public.fr/' },
  { uri: require('../Assets/slider5.png'), url: 'https://www.toodego.com/connect/' },
  { uri: require('../Assets/slider6.png'), url: 'https://www.mairie.neuvillesursaone.fr/actualites/info-municipale/telechargez-cityall/' },
  { uri: require('../Assets/slider7.png'), url: 'https://www.facebook.com/profile.php?id=100064593043905&locale=fr_FR' },
];

const CarouselComponent = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.uri} style={styles.image} />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
          <Button style={styles.buttonWrapper}
              title="Accéder au site"
              onPress={() => Linking.openURL(item.url)}
              color="#FFC200"
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth - 60}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeSlide === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -90,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    height: 200,
    width: viewportWidth - 60,
    overflow: 'hidden',
    marginBottom: 50,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '15%',
    alignSelf: 'center',
  },
  buttonWrapper: {
    borderRadius: 10, // Ajoutez le borderRadius ici
    overflow: 'hidden', // Assurez-vous que le borderRadius s'applique
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: -15,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: -25,
  },
  activeDot: {
    backgroundColor: '#30276C',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
});

export default CarouselComponent;
