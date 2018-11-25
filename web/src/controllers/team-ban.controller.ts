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
  del,
  requestBody,
} from '@loopback/rest';
import {TeamBan} from '../models';
import {TeamBanRepository} from '../repositories';

export class TeamBanController {
  constructor(
    @repository(TeamBanRepository)
    public teamBanRepository : TeamBanRepository,
  ) {}

  @post('/team-bans', {
    responses: {
      '200': {
        description: 'TeamBan model instance',
        content: {'application/json': {schema: {'x-ts-type': TeamBan}}},
      },
    },
  })
  async create(@requestBody() teamBan: TeamBan): Promise<TeamBan> {
    return await this.teamBanRepository.create(teamBan);
  }

  @get('/team-bans/count', {
    responses: {
      '200': {
        description: 'TeamBan model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TeamBan)) where?: Where,
  ): Promise<Count> {
    return await this.teamBanRepository.count(where);
  }

  @get('/team-bans', {
    responses: {
      '200': {
        description: 'Array of TeamBan model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': TeamBan}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TeamBan)) filter?: Filter,
  ): Promise<TeamBan[]> {
    return await this.teamBanRepository.find(filter);
  }

  @patch('/team-bans', {
    responses: {
      '200': {
        description: 'TeamBan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() teamBan: TeamBan,
    @param.query.object('where', getWhereSchemaFor(TeamBan)) where?: Where,
  ): Promise<Count> {
    return await this.teamBanRepository.updateAll(teamBan, where);
  }

  @get('/team-bans/{id}', {
    responses: {
      '200': {
        description: 'TeamBan model instance',
        content: {'application/json': {schema: {'x-ts-type': TeamBan}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<TeamBan> {
    return await this.teamBanRepository.findById(id);
  }

  @patch('/team-bans/{id}', {
    responses: {
      '204': {
        description: 'TeamBan PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() teamBan: TeamBan,
  ): Promise<void> {
    await this.teamBanRepository.updateById(id, teamBan);
  }

  @del('/team-bans/{id}', {
    responses: {
      '204': {
        description: 'TeamBan DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.teamBanRepository.deleteById(id);
  }
}
