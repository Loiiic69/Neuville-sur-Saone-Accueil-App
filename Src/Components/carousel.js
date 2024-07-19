import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Button, Linking, Modal, Text, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig'; // Importez la base de données

const { width: viewportWidth } = Dimensions.get('window');

const CarouselComponent = () => {
  const [images, setImages] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState('');
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(database, '/images'));
        const data = snapshot.val();
        setImages(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données Firebase :", error);
      }
    };

    fetchData();
  }, []);

  const handleImagePress = (url) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <TouchableOpacity onPress={() => handleImagePress(item.url)} style={styles.imageContainer}>
        <Image source={{ uri: item.uri }} style={styles.image} />
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
