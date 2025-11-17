import { View, StyleSheet, Text, Pressable } from 'react-native';

type Props = {
  label: string;
  onPress?: () => void;
}

export default function Button({ label, onPress }: Props) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text style={styles.label} >{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textDecorationLine: 'underline',
    padding: 10,
  },
});
