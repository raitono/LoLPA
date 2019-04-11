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
import {Champion} from '../models';
import {ChampionRepository} from '../repositories';

export class ChampionController {
  constructor(
    @repository(ChampionRepository)
    public championRepository : ChampionRepository,
  ) {}

  @post('/champions', {
    responses: {
      '200': {
        description: 'Champion model instance',
        content: {'application/json': {schema: {'x-ts-type': Champion}}},
      },
    },
  })
  async create(@requestBody() champion: Champion): Promise<Champion> {
    return await this.championRepository.create(champion);
  }

  @get('/champions/count', {
    responses: {
      '200': {
        description: 'Champion model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Champion)) where?: Where,
  ): Promise<Count> {
    return await this.championRepository.count(where);
  }

  @get('/champions', {
    responses: {
      '200': {
        description: 'Array of Champion model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Champion}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Champion)) filter?: Filter,
  ): Promise<Champion[]> {
    return await this.championRepository.find(filter);
  }

  @patch('/champions', {
    responses: {
      '200': {
        description: 'Champion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() champion: Champion,
    @param.query.object('where', getWhereSchemaFor(Champion)) where?: Where,
  ): Promise<Count> {
    return await this.championRepository.updateAll(champion, where);
  }

  @get('/champions/{id}', {
    responses: {
      '200': {
        description: 'Champion model instance',
        content: {'application/json': {schema: {'x-ts-type': Champion}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Champion> {
    return await this.championRepository.findById(id);
  }

  @patch('/champions/{id}', {
    responses: {
      '204': {
        description: 'Champion PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() champion: Champion,
  ): Promise<void> {
    await this.championRepository.updateById(id, champion);
  }

  @put('/champions/{id}', {
    responses: {
      '204': {
        description: 'Champion PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() champion: Champion,
  ): Promise<void> {
    try {
      await this.championRepository.findById(id);
      await this.championRepository.replaceById(id, champion);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.championRepository.create(champion);
      } else {
        throw error;
      }
    }
  }

  @del('/champions/{id}', {
    responses: {
      '204': {
        description: 'Champion DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.championRepository.deleteById(id);
  }
}
