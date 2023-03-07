import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express, { Express, Request, Response } from "express"
import path from "path"

import { getSummonerByName, getMatchesByPuuid, getMatchById } from './services/riot-api/index.js'

dotenv.config()

const server: Express = express()

server.use(express.static("public"))

server.get("/summoners/:summonerId/match-history", async (req: Request, res: Response) => {
  const summonerData = await getSummonerByName(req.params.summonerId)
  const recentMatchIds = await getMatchesByPuuid(summonerData.puuid)

  const matches = await Promise.all(
    recentMatchIds.map((matchId: String) => getMatchById(matchId))
  )

  const matchHistoryResults = matches.map((match) => {
    const participant = match.info.participants.find(
      (participant) => participant.puuid == summonerData.puuid
    )
    return {
      // outcome: String
      gameDuration: match.info.gameDuration,
      summonerName: participant.summonerName,
      // summonerSpells: Array<number>
      // summonerPerks: Array<number>
      championId: participant.championId,
      championName: participant.championName,
      kills: participant.kills,
      deaths: participant.deaths,
      assists: participant.assists,
      championLevel: participant.championLevel
    }
  })

  res.json({
    "results": matchHistoryResults
  })
})

server.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
})

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})