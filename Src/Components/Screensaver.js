import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { db } from '../firebaseConfig'; // Importez la configuration Firebase
import { ref, get } from 'firebase/database';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_WIDTH = SCREEN_WIDTH * 0.8; // Largeur de l'image : 80% de la largeur de l'écran
const INTERVAL = 10000; // Intervalle de défilement automatique en millisecondes (20 secondes)
const MAX_IMAGE_HEIGHT = Dimensions.get('window').height * 0.7; // Hauteur maximale autorisée des images (70% de la hauteur de l'écran)

const ScreensaverComponent = ({ onNavigateToHome }) => {
  const flatListRef = useRef(null);
  const [images, setImages] = useState([]); // State pour stocker les images
  const [currentIndex, setCurrentIndex] = useState(0);

  // Récupérer les images depuis Firebase au montage du composant
  useEffect(() => {
    const fetchImages = async () => {
      const sliderRef = ref(db, 'slider/uris'); // Référence au chemin des images dans Firebase
      const snapshot = await get(sliderRef);
      if (snapshot.exists()) {
        setImages(snapshot.val()); // Mettre à jour le state avec les URIs des images
      } else {
        console.log('No data available');
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    // Fonction pour faire défiler automatiquement les images
    const autoScroll = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    };

    const intervalId = setInterval(autoScroll, INTERVAL);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, [currentIndex, images]);

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        {images.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={images}
            renderItem={({ item }) => (
              <Image 
                source={{ uri: item }} 
                style={{ 
                  width: IMAGE_WIDTH,
                  height: MAX_IMAGE_HEIGHT, 
                  resizeMode: 'contain',
                }} 
              />
            )}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={IMAGE_WIDTH}
            onScrollToIndexFailed={() => {}}
          />
        ) : (
          <Text>Chargement des images...</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={onNavigateToHome}>
        <Text style={styles.buttonText}>Retour à l'accueil</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centre le contenu verticalement
    alignItems: 'center', // Centre le contenu horizontalement
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)', // Fond semi-transparent plus sombre pour un meilleur contraste
    zIndex: 9999, // Assure que le screensaver est au-dessus des autres contenus
  },
  carouselContainer: {
    width: IMAGE_WIDTH, // Largeur du conteneur de carousel
    height: 'auto', // Hauteur automatique en fonction des images
    justifyContent: 'center', // Centrer verticalement les images dans le conteneur
    marginBottom: 50, // Espacement entre le carousel et le bouton
  },
  button: {
    position: 'absolute',
    bottom: 20, // Positionne le bouton plus bas (20px au lieu de 50px)
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FFC200',
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScreensaverComponent;
