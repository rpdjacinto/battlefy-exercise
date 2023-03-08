import React, { useState, useMemo } from 'react';
import {
  Box,
  VStack,
  Container,
  Center,
  Input,
  ChakraProvider,
  Spinner,
  Text
} from '@chakra-ui/react'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { getMatchHistory } from './api'

import MatchListItem from './components/MatchListItem'

const queryClient = new QueryClient()

const MatchList = (matches) => {
  if (!matches) {
    return (
      <Text>No matches exist for this Summoner.</Text>
    )
  }

  console.log(matches)

  return (
    <>
      {/* {matches.map((match) => {
        <MatchListItem
          gameDuration={match.gameDuration}
          gameEndTimestamp={match.gameEndTimestamp}
          gameType={match.gameType}
          outcome={match.Outcome}
          championName={match.championName}
          championAvatarUrl={match.championAvatarUrl}
          championLevel={match.championLevel}
          kills={match.kills}
          deaths={match.deaths}
          assists={match.assists}
        />
      })} */}
    </>
  )

}

const SummonerMatchHistory = () => {
  const [summonerName, setSummonerName] = useState('')
  const handleSummonerNameChange = (event) => setSummonerName(event.target.value)

  const data = useMemo(() => {
    if (!summonerName) {
      return []
    }
    try {
      return getMatchHistory(summonerName)
    }
    catch {
      return []
    }
  }, [summonerName])
  
  const matchHistoryList = <MatchList matches={data}/>

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
          {matchHistoryList}
        </Box>
      </VStack>
    </Container>
  )
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Center w="100vw" h="100vh">
          <SummonerMatchHistory />
        </Center>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
