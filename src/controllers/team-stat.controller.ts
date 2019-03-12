import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TeamStat} from '../models';
import {TeamStatRepository} from '../repositories';

export class TeamStatController {
  constructor(
    @repository(TeamStatRepository)
    public teamStatRepository : TeamStatRepository,
  ) {}

  @post('/team-stats', {
    responses: {
      '200': {
        description: 'TeamStat model instance',
        content: {'application/json': {schema: {'x-ts-type': TeamStat}}},
      },
    },
  })
  async create(@requestBody() teamStat: TeamStat): Promise<TeamStat> {
    return await this.teamStatRepository.create(teamStat);
  }

  @post('/team-stats/batch', {
    responses: {
      '200': {
        description: 'Array of TeamStat model instances',
        content: {'application/json': {schema: {
          type: 'array',
          items: {
            'x-ts-type': TeamStat,
          },
        }}},
      },
    },
  })
  async createBatch(@requestBody() teamStats: TeamStat[]): Promise<void> {
    if(teamStats.length === 0){
      return;
    }
    let sql: string = 'INSERT INTO team_stat(gameId, teamId, win, baronKills, riftHeraldKills, vilemawKills, inhibitorKills, towerKills, dragonKills, dominionVictoryScore, firstDragon, firstInhibitor, firstRiftHerald, firstBlood, firstTower)VALUES';

    teamStats.forEach((s, i) => {
      sql = sql+'(' + s.gameId + ',' + s.teamId + ',\'' + s.win + '\',' + s.baronKills + ',' + s.riftHeraldKills + ',' +
      s.vilemawKills + ',' + s.inhibitorKills + ',' + s.towerKills + ',' + s.dragonKills + ',' + s.dominionVictoryScore +
      ',' + s.firstDragon + ',' + s.firstInhibitor + ',' + s.firstRiftHerald + ',' + s.firstBlood + ',' + s.firstTower + ')';
      if (i !== teamStats.length - 1){
        sql = sql + ',';
      }
    });

    await this.teamStatRepository.dataSource.execute(sql);
  }

  @get('/team-stats/count', {
    responses: {
      '200': {
        description: 'TeamStat model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TeamStat)) where?: Where,
  ): Promise<Count> {
    return await this.teamStatRepository.count(where);
  }

  @get('/team-stats', {
    responses: {
      '200': {
        description: 'Array of TeamStat model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': TeamStat}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TeamStat)) filter?: Filter,
  ): Promise<TeamStat[]> {
    return await this.teamStatRepository.find(filter);
  }

  @patch('/team-stats', {
    responses: {
      '200': {
        description: 'TeamStat PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() teamStat: TeamStat,
    @param.query.object('where', getWhereSchemaFor(TeamStat)) where?: Where,
  ): Promise<Count> {
    return await this.teamStatRepository.updateAll(teamStat, where);
  }

  @get('/team-stats/{id}', {
    responses: {
      '200': {
        description: 'TeamStat model instance',
        content: {'application/json': {schema: {'x-ts-type': TeamStat}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<TeamStat> {
    return await this.teamStatRepository.findById(id);
  }

  @patch('/team-stats/{id}', {
    responses: {
      '204': {
        description: 'TeamStat PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() teamStat: TeamStat,
  ): Promise<void> {
    await this.teamStatRepository.updateById(id, teamStat);
  }

  @put('/team-stats/{id}', {
    responses: {
      '204': {
        description: 'TeamStat PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() teamStat: TeamStat,
  ): Promise<void> {
    try {
      await this.teamStatRepository.findById(id);
      await this.teamStatRepository.replaceById(id, teamStat);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.teamStatRepository.create(teamStat);
      } else {
        throw error;
      }
    }
  }

  @del('/team-stats/{id}', {
    responses: {
      '204': {
        description: 'TeamStat DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.teamStatRepository.deleteById(id);
  }
}
