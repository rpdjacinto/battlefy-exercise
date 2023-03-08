
const getBaseUrl = (region: "na1" |  "americas" = "na1") => `https://${region}.api.riotgames.com`

const getSummonerByNameRoute = (name: String) => `lol/summoner/v4/summoners/by-name/${name}`
const getMatchesByPuuidRoute = (puuid: String) => `lol/match/v5/matches/by-puuid/${puuid}/ids`
const getMatchByIdRoute = (matchId: String) => `lol/match/v5/matches/${matchId}`

const apiCall = async (
  url: String,
  queryParams: any = {},
  region: "na1" | "americas" = "na1"
) => {
  return fetch(
    `${getBaseUrl(region)}/${url}?` + new URLSearchParams({
      ...queryParams,
      api_key: process.env.RIOT_API_KEY
    }),
    {
      method: "GET"
    })
    .then((response) => response.json())
}

export const getSummonerByName = async (name: string) => {
  return apiCall(getSummonerByNameRoute(name))
}

export const getMatchesByPuuid = async (puuid: String) => {
  return apiCall(getMatchesByPuuidRoute(puuid), {
    count: 5
  }, "americas")
}

export const getMatchById = async (matchId: String) => {
  return apiCall(getMatchByIdRoute(matchId), {}, "americas")
}