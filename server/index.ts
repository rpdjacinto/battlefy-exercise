import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express, { Express, Request, Response } from "express"
import cors from "cors"
import path from "path"

import { getSummonerByName, getMatchesByPuuid, getMatchById } from './services/riot-api/index.js'

dotenv.config()

const server: Express = express()

server.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080']
}))

server.use('/static', express.static(path.join(process.env.PWD, "/../app/build/static")))

server.get("/summoners/:summonerId/match-history", async (req: Request, res: Response) => {
  try {
    const summonerData = await getSummonerByName(req.params.summonerId)
    const recentMatchIds = await getMatchesByPuuid(summonerData.puuid)
    const matches = await Promise.all(
      recentMatchIds.map((matchId: String) => getMatchById(matchId))
    )
    const matchHistoryResults = matches.map(match => {
      const participant = match.info.participants.find(
        participant => participant.puuid == summonerData.puuid
      )
      return {
        matchId: match.matchId,
        outcome: participant.win ? 'Victory' : 'Defeat',
        gameEndTimestamp: match.info.gameEndTimestamp,
        gameDuration: match.info.gameDuration,
        summonerName: participant.summonerName,
        championId: participant.championId,
        championName: participant.championName,
        championAvatarUrl: `http://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${participant.championName}.png`,
        kills: participant.kills,
        deaths: participant.deaths,
        assists: participant.assists,
        championLevel: participant.championLevel
      }
    })

    res.json({
      "results": matchHistoryResults
    })
  } catch {
    res.json({
      "results": []
    })
  }
})

server.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(process.env.PWD, "/../app/build/", "index.html"));
})

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})