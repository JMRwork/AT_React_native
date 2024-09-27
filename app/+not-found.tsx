import { Link, Stack } from 'expo-router';
import { Text } from 'react-native-paper';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text>Essa página não existe.</Text>
      <Link href="/">
        <Text>Voltar para pagina Home</Text>
      </Link>
    </>
  );
}

