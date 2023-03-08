import { MatchHistoryResult } from './types'

const API_BASE_URL = 'http://localhost:8080'

export const getMatchHistory = async (summonerName: String): Promise<Array<MatchHistoryResult>> => {
  return await fetch(
    `${API_BASE_URL}/summoners/${summonerName}/match-history`,
    {
      method: "GET"
    }).then(response => response.json()).then(response => response.results)
}