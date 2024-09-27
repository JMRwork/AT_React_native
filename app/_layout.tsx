import { Stack } from 'expo-router';
import { SessionProvider } from './ctx';
import {
  MD3DarkTheme as DarkTheme, DefaultTheme, PaperProvider
} from 'react-native-paper';
import { useStorageState } from './useStorageState';
import { useEffect } from 'react';
import { createTables, dropTable, populateDatabase } from '@/services/database';



// Prevent the splash screen from auto-hiding before asset loading is complete.


export default function RootLayout() {
  const [[isLoadingTheme, theme], setTheme] = useStorageState('theme');
  const themeJson = {
    'dark': DarkTheme,
    'default': DefaultTheme
  }

  useEffect(() => {
    createTables();
  }, []);

  return (
    <PaperProvider theme={theme === "dark" ? themeJson['dark'] : themeJson['default']}>
      <SessionProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="forgot-password" />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
        </Stack>
      </SessionProvider>
    </PaperProvider >
  );
}
