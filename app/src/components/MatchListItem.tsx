import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'

import {
  Avatar,
  Box,
  Container,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Text
} from '@chakra-ui/react'

dayjs.extend(relativeTime)
dayjs.extend(duration)

const MatchListItem = ({
  gameDuration,
  gameEndTimestamp,
  gameType,
  outcome,
  kills,
  deaths,
  assists,
  championName,
  championAvatarUrl,
  championLevel,
}) => {

  const gameDateString: String = dayjs(gameEndTimestamp).fromNow()

  return (
    <Container width="100%">
      <Card>
        <CardHeader>
          <Box>
            <Heading size='sm'>{gameType} ({outcome})</Heading>
            <Text>{gameDateString} | {gameDuration}</Text>
          </Box>
        </CardHeader>

        <CardBody>
          <Flex>
            <Flex flex='1'>
              <HStack p='4'>
                <Avatar name={championName} src={championAvatarUrl} />
                <Box>
                  <Heading size='sm'>{championName}</Heading>
                  <Text>Level {championLevel}</Text>
                </Box>
              </HStack>
            </Flex>
            <Flex flex='4' p='4'>
              <StatGroup width="100%">
                <Stat>
                  <StatLabel>Kills</StatLabel>
                  <StatNumber>{kills}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Deaths</StatLabel>
                  <StatNumber>{deaths}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Assists</StatLabel>
                  <StatNumber>{assists}</StatNumber>
                </Stat>
              </StatGroup>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Container>
  )
}

export default MatchListItem