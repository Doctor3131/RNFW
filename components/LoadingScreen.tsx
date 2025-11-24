import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#fff',
  },
  text: {

    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
