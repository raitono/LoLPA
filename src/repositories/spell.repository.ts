import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Spell} from '../models';
import {RiotDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SpellRepository extends DefaultCrudRepository<
  Spell,
  typeof Spell.prototype.spellId
> {
  constructor(
    @inject('datasources.riot') dataSource: RiotDataSource,
  ) {
    super(Spell, dataSource);
  }
}
