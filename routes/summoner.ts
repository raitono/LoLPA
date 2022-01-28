import express from 'express';
import { LolApi } from 'twisted';
import { Regions, RegionGroups } from 'twisted/dist/constants';
import { ChampionsDataDragonDetails } from 'twisted/dist/models-dto';
import { riotKeyCheck } from '../middleware/riotKeyCheck';
import { IChampionMastery, getChampionByName } from '../models/Champion';

let router = express.Router();

router.use(riotKeyCheck);

router.get('/:region/:name/champion-mastery/points', async (req, res, next) => {
  const { region, name } = req.params;
  const api = new LolApi(process.env.RIOT_API_KEY!);

  const summoner = await api.Summoner.getByName(name, Regions.AMERICA_NORTH);
  const masteryPoints: number = (await api.Champion.championsScore(summoner.response.id, Regions.AMERICA_NORTH)).score;

  res.status(200).json(masteryPoints);
});

router.get('/:region/:name/champion-mastery/highest', async (req, res, next) => {
  const { region, name } = req.params;
  const api = new LolApi(process.env.RIOT_API_KEY!);

  const summoner = await api.Summoner.getByName(name, Regions.AMERICA_NORTH);
  const championMastery: IChampionMastery = (await api.Champion.masteryBySummoner(summoner.response.id, Regions.AMERICA_NORTH)).response[0];

  res.status(200).json(championMastery);
});

router.get('/:region/:name/champion-mastery/:champion', async (req, res, next) => {
  const { region, name, champion } = req.params;

  const api = new LolApi(process.env.RIOT_API_KEY!);

  const summoner = await api.Summoner.getByName(name, Regions.AMERICA_NORTH);
  const championDetails: ChampionsDataDragonDetails = await getChampionByName(champion);
  const championMastery: IChampionMastery = (await api.Champion.masteryBySummonerChampion(summoner.response.id, Number.parseInt(championDetails.key), Regions.AMERICA_NORTH)).response;

  res.status(200).json(championMastery);
});

router.get('/:region/:name/recent-matches', async (req, res, next) => {
  const { region, name } = req.params;

  const api = new LolApi(process.env.RIOT_API_KEY!);
  const summoner = (await api.Summoner.getByName(name, Regions.AMERICA_NORTH)).response;
  const matchList: string[] = (await api.MatchV5.list(summoner.puuid, RegionGroups.AMERICAS, { count: 10, queue: 420 })).response;

  const matches = (await Promise.all(matchList.map(m => api.MatchV5.get(m, RegionGroups.AMERICAS)))).map(r => r.response);

  res.status(200).json(matches);
});

/**
 * Attempts to get a Summoner from the db
 * If not found, gets it from Riot instead
 */
router.get('/:region/:name', async (req, res, next) => {
  let { region, name } = req.params;

  // const conn = await createConnection();
  // const summonerRepo = conn.getRepository(SummonerEntity);
  // let summoner: ISummoner | undefined = await summonerRepo.findOne({ name });

  // if (!summoner) {
  try {
    console.debug(`Summoner ${name} not found, getting from Riot API...`)
    const api = new LolApi(process.env.RIOT_API_KEY!);
    let summoner = (await api.Summoner.getByName(name, Regions.AMERICA_NORTH)).response;
    res.status(200).json(summoner);
    // console.debug(`Creating new Summoner ${name}`)
    // const newSummoner = summonerRepo.create(summoner);
    // summonerRepo.save(newSummoner);
  } catch (error: unknown) {
    res.sendStatus(404);
    return;
  }
  // }

  // res.status(200).json(summoner);
});

export default router;