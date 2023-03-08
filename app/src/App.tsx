import React, { useState } from 'react';
import {
  Box,
  VStack,
  Container,
  Center,
  Input,
  ChakraProvider,
  Heading,
  Spinner,
  Text
} from '@chakra-ui/react'
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { getMatchHistory } from './api'

import MatchListItem from './components/MatchListItem'

const queryClient = new QueryClient()

const MatchList = ({ summonerName }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["results", summonerName],
    queryFn: () => getMatchHistory(summonerName),
    enabled: summonerName.length > 0
  })

  if (!data) {
    return <Text>There are no matches for this Summoner.</Text>
  }

  return (
    <>
      {!!summonerName && !isLoading && !isError && data && data.map((match) => {
        return <MatchListItem
          gameDuration={match.gameDuration}
          gameEndTimestamp={match.gameEndTimestamp}
          gameType={match.gameType}
          outcome={match.outcome}
          championName={match.championName}
          championAvatarUrl={match.championAvatarUrl}
          championLevel={match.championLevel}
          kills={match.kills}
          deaths={match.deaths}
          assists={match.assists}
        />
      })}
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
          <MatchList summonerName={summonerName} />
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
