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
import {ChampionTag} from '../models';
import {ChampionTagRepository} from '../repositories';

export class ChampionTagController {
  constructor(
    @repository(ChampionTagRepository)
    public championTagRepository : ChampionTagRepository,
  ) {}

  @post('/champion-tags', {
    responses: {
      '200': {
        description: 'ChampionTag model instance',
        content: {'application/json': {schema: {'x-ts-type': ChampionTag}}},
      },
    },
  })
  async create(@requestBody() championTag: ChampionTag): Promise<ChampionTag> {
    return await this.championTagRepository.create(championTag);
  }

  @get('/champion-tags/count', {
    responses: {
      '200': {
        description: 'ChampionTag model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ChampionTag)) where?: Where,
  ): Promise<Count> {
    return await this.championTagRepository.count(where);
  }

  @get('/champion-tags', {
    responses: {
      '200': {
        description: 'Array of ChampionTag model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ChampionTag}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ChampionTag)) filter?: Filter,
  ): Promise<ChampionTag[]> {
    return await this.championTagRepository.find(filter);
  }

  @patch('/champion-tags', {
    responses: {
      '200': {
        description: 'ChampionTag PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() championTag: ChampionTag,
    @param.query.object('where', getWhereSchemaFor(ChampionTag)) where?: Where,
  ): Promise<Count> {
    return await this.championTagRepository.updateAll(championTag, where);
  }

  @get('/champion-tags/{id}', {
    responses: {
      '200': {
        description: 'ChampionTag model instance',
        content: {'application/json': {schema: {'x-ts-type': ChampionTag}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ChampionTag> {
    return await this.championTagRepository.findById(id);
  }

  @patch('/champion-tags/{id}', {
    responses: {
      '204': {
        description: 'ChampionTag PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() championTag: ChampionTag,
  ): Promise<void> {
    await this.championTagRepository.updateById(id, championTag);
  }

  @put('/champion-tags/{id}', {
    responses: {
      '204': {
        description: 'ChampionTag PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() championTag: ChampionTag,
  ): Promise<void> {
    await this.championTagRepository.replaceById(id, championTag);
  }

  @del('/champion-tags/{id}', {
    responses: {
      '204': {
        description: 'ChampionTag DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.championTagRepository.deleteById(id);
  }
}
