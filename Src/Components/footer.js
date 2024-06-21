import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Annuaire</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity>
          <Text style={styles.footerText}>Recrutements</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity>
          <Text style={styles.footerText}>Marchés publics</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity>
          <Text style={styles.footerText}>Mentions légales</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity>
          <Text style={styles.footerText}>Données personnelles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#2E2263', // Couleur de fond violet
    paddingVertical: 25,
    alignItems: 'center',
    width: '100%',
    height : 70,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#FFFFFF', // Couleur du texte blanc
    fontSize: 14,
    marginHorizontal: 5,
  },
  separator: {
    color: '#FFFFFF', // Couleur des séparateurs
    fontSize: 14,
  },
});

export default Footer;
