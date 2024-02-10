import { ChakraProvider } from '@chakra-ui/react';
import customTheme from './theme';
import { Routes } from './routes';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Routes />
    </ChakraProvider>
  );
}

export default App;
