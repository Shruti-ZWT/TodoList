import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SplashScreen = () => {
  const zoomValue = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const zoomInAnimation = Animated.timing(zoomValue, {
      toValue: 1.2,
      duration: 5000,
      useNativeDriver: true,
    });

    // Start the animation
    Animated.loop(zoomInAnimation).start();

    return () => {
      zoomValue.setValue(1);
    };
  }, [zoomValue]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assests/splashImage.png')}
        style={[styles.image, { transform: [{ scale: zoomValue }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;

