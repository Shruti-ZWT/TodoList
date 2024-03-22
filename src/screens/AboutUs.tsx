import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam
        non nisi tincidunt aliquet. Cras nec malesuada lectus. In hac
        habitasse platea dictumst. Quisque faucibus malesuada leo, vitae
        consequat lorem iaculis eu. Nullam eget ipsum sit amet enim posuere
        volutpat. Donec lacinia vestibulum enim, in fringilla ligula eleifend
        quis. Curabitur convallis velit vel interdum faucibus. Aenean nec
        augue tristique, maximus ex nec, ullamcorper eros. Curabitur ut metus
        vel metus finibus congue. Nam vel malesuada risus. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac
        turpis egestas.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AboutScreen;