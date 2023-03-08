import React from 'react'
import {
  VStack,
  Center,
  ChakraProvider,
  Heading,
} from '@chakra-ui/react'

import SummonerMatchHistory from './components/SummonerMatchHistory'

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Center w="100vw" h="100vh">
          <VStack w="100%">
            <Heading size='xl'>League Stats</Heading>
            <SummonerMatchHistory />
          </VStack>
        </Center>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
