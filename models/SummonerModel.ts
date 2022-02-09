import { DataTypes, Model, ModelAttributes, Optional, Sequelize } from 'sequelize';

export interface ISummoner {
  id: string;
  summonerId: string;
  accountId: string;
  puuid: string;
  name: string;
  summonerLevel: number;
  revisionDate: number;
  profileIconId: number;
}

export class Summoner extends Model implements ISummoner {
  public id!: string;
  public summonerId!: string;
  public accountId!: string;
  public puuid!: string;
  public name!: string;
  public summonerLevel!: number;
  public revisionDate!: number;
  public profileIconId!: number;
}

const attr: ModelAttributes<Summoner, any> = {
  summonerId: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  accountId: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  puuid: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  summonerLevel: {
    allowNull: false,
    type: DataTypes.NUMBER,
  },
  revisionDate: {
    allowNull: false,
    type: DataTypes.NUMBER,
  },
  profileIconId: {
    allowNull: false,
    type: DataTypes.NUMBER,
  }
}

export default (sequelize: Sequelize) => {
  Summoner.init(attr, {
    sequelize,
    modelName: 'Summoner'
  });

  return Summoner;
}
