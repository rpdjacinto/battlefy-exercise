export type MatchHistoryResult = {
  gameDuration: Number
  gameEndTimestamp: Number
  gameType: String
  outcome: "Winner" | "Loser"
  championName: String
  championAvatarUrl: String
  championLevel: Number
  kills: Number
  deaths: Number
  assists: Number
}

export type MatchHistoryResponse = {
  results: Array<MatchHistoryResult>
}