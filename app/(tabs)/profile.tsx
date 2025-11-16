import { useAuthStore } from '@/store/authStore';
import { StyleSheet, View, Text } from 'react-native';

import Button from '@/components/Button';

export default function Page() {
  const { logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>

      <Button label="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
