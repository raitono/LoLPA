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
import {Summoner} from '../models';
import {SummonerRepository} from '../repositories';

export class SummonerController {
  constructor(
    @repository(SummonerRepository)
    public summonerRepository : SummonerRepository,
  ) {}

  @post('/summoners', {
    responses: {
      '200': {
        description: 'Summoner model instance',
        content: {'application/json': {schema: {'x-ts-type': Summoner}}},
      },
    },
  })
  async create(@requestBody() summoner: Summoner): Promise<Summoner> {
    return await this.summonerRepository.create(summoner);
  }

  @get('/summoners/count', {
    responses: {
      '200': {
        description: 'Summoner model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Summoner)) where?: Where,
  ): Promise<Count> {
    return await this.summonerRepository.count(where);
  }

  @get('/summoners', {
    responses: {
      '200': {
        description: 'Array of Summoner model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Summoner}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Summoner)) filter?: Filter,
  ): Promise<Summoner[]> {
    return await this.summonerRepository.find(filter);
  }

  @patch('/summoners', {
    responses: {
      '200': {
        description: 'Summoner PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() summoner: Summoner,
    @param.query.object('where', getWhereSchemaFor(Summoner)) where?: Where,
  ): Promise<Count> {
    return await this.summonerRepository.updateAll(summoner, where);
  }

  @get('/summoners/{id}', {
    responses: {
      '200': {
        description: 'Summoner model instance',
        content: {'application/json': {schema: {'x-ts-type': Summoner}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Summoner> {
    return await this.summonerRepository.findById(id);
  }

  @patch('/summoners/{id}', {
    responses: {
      '204': {
        description: 'Summoner PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() summoner: Summoner,
  ): Promise<void> {
    await this.summonerRepository.updateById(id, summoner);
  }

  @del('/summoners/{id}', {
    responses: {
      '204': {
        description: 'Summoner DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.summonerRepository.deleteById(id);
  }
}
