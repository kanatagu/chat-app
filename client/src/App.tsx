import { ChakraProvider } from '@chakra-ui/react';
// import { io } from 'socket.io-client';
import customTheme from './theme';
import { Routes } from './routes';
// const socket = io('http://localhost:3000');

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Routes />
    </ChakraProvider>
  );
}

export default App;
