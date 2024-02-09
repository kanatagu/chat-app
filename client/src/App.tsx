import { ChakraProvider } from '@chakra-ui/react';
// import { io } from 'socket.io-client';
import customTheme from './theme';
import { Routes } from './routes';
import { AuthProvider } from './providers';
// const socket = io('http://localhost:3000');

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
