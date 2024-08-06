// src/view/screens/SplashScreen.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00B761', // Green background color
  },
  logo: {
    width: 200, // Adjust width and height as per your logo dimensions
    height: 200,
  },
});

export default SplashScreen;
