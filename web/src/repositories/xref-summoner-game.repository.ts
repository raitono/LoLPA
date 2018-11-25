import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {XrefSummonerGame} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class XrefSummonerGameRepository extends DefaultCrudRepository<
  XrefSummonerGame,
  typeof XrefSummonerGame.prototype.summonerId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(XrefSummonerGame, dataSource);
  }
}
