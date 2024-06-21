import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Navi } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importez votre logo ici
import logo from '../Assets/logo_footer.png';
import icon1 from '../Assets/picto_menu 1.png';
import icon2 from '../Assets/picto_contact 1.png';
import icon3 from '../Assets/picto_tel 1.png';
const NavBar = ({ navigation  }) => {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.iconsContainer}>
      <Image source={icon1} style={styles.icon} />
      <TouchableOpacity title="Go to Details" onPress={() => navigation.navigate('Contact')}> 
      <Image source={icon2} style={styles.icon} />
      </TouchableOpacity>
        <Image source={icon3} style={styles.icon} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    paddingTop: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: 270,
    height: 130,
    position: 'absolute',
    left: -20,
    top: 40,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
  },
  icon: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
});

export default NavBar;
