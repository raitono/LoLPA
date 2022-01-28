import express from 'express';
import { LolApi } from 'twisted';
import { IChampion } from '../models/Champion';
import riotKeyCheck from '../middleware/riotKeyCheck';

let router = express.Router();

router.use(riotKeyCheck);

router.get('/:id/:patch', async (req, res, next) => {
  if (req.method === "GET") {
    let { id } = req.params;

    const api = new LolApi(process.env.RIOT_API_KEY!);
    let champion: IChampion = await api.DataDragon.getChampion(Number.parseInt(id));

    res.status(200).json(champion);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

export default router;
