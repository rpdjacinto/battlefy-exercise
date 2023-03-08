import React from 'react'
import {
  Spinner,
  Text
} from '@chakra-ui/react'

import { useQuery } from 'react-query'

import { getMatchHistory } from '../api'

import MatchListItem from './MatchListItem'

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
      {isLoading && <Spinner />}
      {isError && <Text>ERROR: Something went wrong</Text>}
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

export default MatchList