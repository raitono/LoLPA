import { LolApi } from 'twisted';
import { ChampionsDataDragonDetails } from 'twisted/dist/models-dto';
import { RiotImage } from './riot';

interface IChampionSkin {

}

export interface IChampion {
  id: string,
  name: string,
  title: string;
  image: RiotImage,
  skins: IChampionSkin[],
  tags: string[]
}

export interface IChampionMastery {
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  tokensEarned: number;
  summonerId: string;
}

export async function getChampionByName(name: string): Promise<ChampionsDataDragonDetails> {
  const api = new LolApi(process.env.RIOT_API_KEY!);
  let champions = await api.DataDragon.getChampion();
  return champions.data[name];
}
