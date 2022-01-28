import { RiotImage } from './Riot';

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
