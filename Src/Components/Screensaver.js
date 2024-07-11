import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';

// Importer les images locales
const images = [
  require('../Assets/Images/2024 - été continu.jpg'),
  require('../Assets/Images/2024 -visu  tranquilité vacances.jpg'),
  require('../Assets/Images/légé Grand Lyoncollecte gros électroménagers ecosystem.jpg'),
  require('../Assets/Images/jardinephemere.jpg'),
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_WIDTH = SCREEN_WIDTH * 0.8; // Largeur de l'image : 80% de la largeur de l'écran
const INTERVAL = 10000; // Intervalle de défilement automatique en millisecondes (20 secondes)
const MAX_IMAGE_HEIGHT = Dimensions.get('window').height * 0.7; // Hauteur maximale autorisée des images (70% de la hauteur de l'écran)

const ScreensaverComponent = ({ onNavigateToHome }) => {
  const flatListRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Charger les dimensions des images locales
    const loadImageDimensions = async () => {
      const dimensionsPromises = images.map((image) => 
        new Promise((resolve) => 
          Image.getSize(
            Image.resolveAssetSource(image).uri, 
            (width, height) => resolve({ width, height }),
            () => resolve({ width: SCREEN_WIDTH, height: SCREEN_WIDTH }) // Valeurs par défaut en cas d'erreur
          )
        )
      );

      const dimensions = await Promise.all(dimensionsPromises);
      setImageDimensions(dimensions);
    };

    loadImageDimensions();
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
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={({ item, index }) => {
            const { width, height } = imageDimensions[index] || { width: SCREEN_WIDTH, height: SCREEN_WIDTH };
            const aspectRatio = width / height;
            const imageHeight = Math.min(IMAGE_WIDTH / aspectRatio, MAX_IMAGE_HEIGHT); // Ajuster la hauteur en fonction du ratio d'aspect et des contraintes maximales

            return (
              <Image 
                source={item} 
                style={{ 
                  width: IMAGE_WIDTH,
                  height: imageHeight, // Hauteur dynamique basée sur l'aspect ratio et la hauteur maximale
                  resizeMode: 'contain', // Conserve les proportions de l'image
                }} 
              />
            );
          }}
          horizontal
          keyExtractor={(item, index) => index.toString()} // Utiliser l'index comme clé
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={IMAGE_WIDTH}
          onScrollToIndexFailed={() => {}}
        />
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
