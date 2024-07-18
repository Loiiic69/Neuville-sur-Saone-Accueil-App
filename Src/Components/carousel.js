import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Button, Linking, Modal, Text, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';

const { width: viewportWidth } = Dimensions.get('window');

const images = [
  { uri: require('../Assets/slider1.png'), url: 'https://www.mairie-neuvillesursaone.fr', info: 'Découvrez les actualités, événements et services proposés par la mairie de Neuville-sur-Saône. Accédez à toutes les informations municipales et restez informé des dernières nouvelles de votre commune.' },
  { uri: require('../Assets/slider2.png'), url: 'https://passeport.ants.gouv.fr/demarches-en-ligne/faire-une-premiere-demande-de-carte-nationale-d-identite', info: 'Effectuez votre première demande de Carte Nationale d\'Identité (CNI) en ligne sur le site de l\'Agence Nationale des Titres Sécurisés (ANTS). Retrouvez toutes les informations nécessaires et suivez les étapes pour obtenir votre CNI.' },
  { uri: require('../Assets/slider3.png'), url: 'https://passeport.ants.gouv.fr/demarches-en-ligne/faire-une-premiere-demande-de-passeport', info: 'Réalisez votre première demande de passeport en ligne via le site de l\'ANTS. Suivez les instructions détaillées et préparez les documents requis pour obtenir votre passeport rapidement et facilement.' },
  { uri: require('../Assets/slider4.png'), url: 'https://www.service-public.fr/', info: 'Service-public.fr est le portail officiel de l\'administration française. Accédez à des informations fiables sur les démarches administratives, les droits et les obligations des citoyens. Trouvez des guides pratiques et des formulaires en ligne.' },
  { uri: require('../Assets/slider5.png'), url: 'https://www.toodego.com/connect/', info: 'Toodego est la plateforme de services en ligne de la Métropole de Lyon. Connectez-vous pour accéder à une variété de services municipaux et métropolitains, gérer vos démarches administratives et rester informé des actualités locales.' },
  { uri: require('../Assets/slider6.png'), url: 'https://www.mairie.neuvillesursaone.fr/actualites/info-municipale/telechargez-cityall/', info: 'Téléchargez l\'application CityAll pour rester connecté avec votre commune. Recevez des notifications en temps réel sur les événements, les alertes et les informations importantes de Neuville-sur-Saône directement sur votre smartphone.' },
  { uri: require('../Assets/slider7.png'), url: 'https://www.facebook.com/profile.php?id=100064593043905&locale=fr_FR', info: 'Suivez la page Facebook officielle de la mairie de Neuville-sur-Saône pour rester informé des dernières nouvelles, événements et annonces. Rejoignez la communauté et participez aux discussions locales.' },
];

const CarouselComponent = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState('');
  const carouselRef = useRef(null);

  const handleImagePress = (url) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <TouchableOpacity onPress={() => handleImagePress(item.url)} style={styles.imageContainer}>
        <Image source={item.uri} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => {
          setModalInfo(item.info);
          setModalVisible(true);
        }}>
          <Ionicons name="help-circle-sharp" size={50} color="#FFC200" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Accéder au site"
            onPress={() => Linking.openURL(item.url)}
            color="#FFC200"
          />
        </View>
      </View>
    </View>
  );

  const handleNext = () => {
    if (carouselRef.current && activeSlide < images.length - 1) {
      carouselRef.current.snapToNext();
    }
  };

  const handlePrev = () => {
    if (carouselRef.current && activeSlide > 0) {
      carouselRef.current.snapToPrev();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowLeft} onPress={handlePrev}>
        <View style={styles.arrowButton}>
          <Ionicons name="chevron-back" size={30} color="#FFF" />
        </View>
      </TouchableOpacity>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth - 60}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <TouchableOpacity style={styles.arrowRight} onPress={handleNext}>
        <View style={styles.arrowButton}>
          <Ionicons name="chevron-forward" size={30} color="#FFF" />
        </View>
      </TouchableOpacity>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{modalInfo}</Text>
          <Button
            title="Fermer"
            onPress={() => setModalVisible(!modalVisible)}
            color="#FFC200"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -90,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '15%',
    alignSelf: 'center',
  },
  buttonWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  arrowLeft: {
    position: 'absolute',
    left: 15,
    top: '50%',
    zIndex: 1,
    transform: [{ translateY: -20 }],
  },
  arrowRight: {
    position: 'absolute',
    right: 15,
    top: '50%',
    zIndex: 1,
    transform: [{ translateY: -20 }],
  },
  arrowButton: {
    backgroundColor: '#30276C',
    borderRadius: 50,
    padding: 10,
    elevation: 4,
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
  modalView: {
    margin: 50,
    backgroundColor: 'white',
    top: '30%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CarouselComponent;
