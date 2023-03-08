import React, { useState } from 'react'
import {
  Box,
  VStack,
  Container,
  Input,
} from '@chakra-ui/react'

import MatchList from './MatchList'

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

export default SummonerMatchHistory