import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes } from './src/routes';
import { initDatabase } from './src/sqlite';
import { theme } from './src/styles/theme';

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
