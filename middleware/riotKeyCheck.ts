import { Request, Response, NextFunction } from 'express';
import { LolApi } from 'twisted';
import { Regions } from 'twisted/dist/constants';

export const riotKeyCheck = async (req: Request, res: Response, next: NextFunction) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).send({ message: "Riot API key missing" });
    return next('router');
  }

  try {
    const api = new LolApi(process.env.RIOT_API_KEY);
    await api.Summoner.getByName('Raitono', Regions.AMERICA_NORTH);
    return next();
  } catch (e) {
    res.status(500).send({ message: "There was a problem using the Riot API. Did the key expire?", error: e });
    return next('router');
  }
}
