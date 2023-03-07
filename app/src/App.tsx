import React, { useState } from 'react';

import {
  Box,
  VStack,
  Container,
  Center,
  Input,
  ChakraProvider,
} from '@chakra-ui/react'
import MatchListItem from './components/MatchListItem'

const MatchList = () => {

  return (
    <>
      <MatchListItem
        gameDuration={900}
        gameDate={1678223818772}
        gameType={'Ranked Solo'}
        outcome={'Victory'}
        championName={'Graves'}
        championAvatarUrl={'http://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/Graves.png'}
        championLevel={13}
        kills={15}
        deaths={5}
        assists={10}
      />
    </>
  )

}

const SummonerMatchHistory = () => {
  const [summonerName, setSummonerName] = useState('')
  const handleSummonerNameChange = (event) => setSummonerName(event.target.value)

  return (
    <Container maxW="2xl">
      <VStack>
        <Box w="100%" p={16}>
          <Input
            value={summonerName}
            onChange={handleSummonerNameChange}
            placeholder='Summoner Name'
            size='lg'
          />
        </Box>
        <Box w="100%">
          <MatchList />
        </Box>
      </VStack>
    </Container>
  )
}

const App = () => {
  return (
    <ChakraProvider>
      <Center w="100vw" h="100vh">
        <SummonerMatchHistory />
      </Center>
    </ChakraProvider>
  );
}

export default App
