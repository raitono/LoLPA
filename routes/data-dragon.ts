import express from 'express';
import { LolApi } from 'twisted';
import riotKeyCheck from '../middleware/riotKeyCheck';
import { RiotRunesDto } from '../models/riot';

let router = express.Router();

router.use(riotKeyCheck);

router.get('/runes', async (req, res, next) => {
  const api = new LolApi(process.env.RIOT_API_KEY!);
  const runes = <unknown>await api.DataDragon.getRunesReforged();
  res.status(200).json(runes as RiotRunesDto[]);
});

export default router;
