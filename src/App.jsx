import { useRoutes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';

function App() {

  return (
    <>
      <ChakraProvider>
        <NavBar />
        <Toaster
          position='bottom-right'
          reverseOrder={false}
        />
      </ChakraProvider>
    </>
  )
}

export default App
