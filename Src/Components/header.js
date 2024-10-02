import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, } from 'react-native';


// Importez votre logo ici
import logo from '../Assets/logo_footer.png';
import icon1 from '../Assets/picto_menu 1.png';

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
        <Image source={icon1} style={styles.icon} />
        </TouchableOpacity>
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
    height: 150,
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
