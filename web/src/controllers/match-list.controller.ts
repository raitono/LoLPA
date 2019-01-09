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
import {MatchList} from '../models';
import {MatchListRepository} from '../repositories';

export class MatchListController {
  constructor(
    @repository(MatchListRepository)
    public matchListRepository : MatchListRepository,
  ) {}

  @post('/match-lists', {
    responses: {
      '200': {
        description: 'MatchList model instance',
        content: {'application/json': {schema: {'x-ts-type': MatchList}}},
      },
    },
  })
  async create(@requestBody() matchList: MatchList): Promise<MatchList> {
    return await this.matchListRepository.create(matchList);
  }

  @get('/match-lists/count', {
    responses: {
      '200': {
        description: 'MatchList model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(MatchList)) where?: Where,
  ): Promise<Count> {
    return await this.matchListRepository.count(where);
  }

  @get('/match-lists', {
    responses: {
      '200': {
        description: 'Array of MatchList model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': MatchList}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(MatchList)) filter?: Filter,
  ): Promise<MatchList[]> {
    return await this.matchListRepository.find(filter);
  }

  @patch('/match-lists', {
    responses: {
      '200': {
        description: 'MatchList PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() matchList: MatchList,
    @param.query.object('where', getWhereSchemaFor(MatchList)) where?: Where,
  ): Promise<Count> {
    return await this.matchListRepository.updateAll(matchList, where);
  }

  @get('/match-lists/{id}', {
    responses: {
      '200': {
        description: 'MatchList model instance',
        content: {'application/json': {schema: {'x-ts-type': MatchList}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<MatchList> {
    return await this.matchListRepository.findById(id);
  }

  @patch('/match-lists/{id}', {
    responses: {
      '204': {
        description: 'MatchList PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() matchList: MatchList,
  ): Promise<void> {
    await this.matchListRepository.updateById(id, matchList);
  }

  @put('/match-lists/{id}', {
    responses: {
      '204': {
        description: 'MatchList PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() matchList: MatchList,
  ): Promise<void> {
    try {
      await this.matchListRepository.findById(id);
      await this.matchListRepository.replaceById(id, matchList);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.matchListRepository.create(matchList);
      } else {
        throw error;
      }
    }
  }

  @del('/match-lists/{id}', {
    responses: {
      '204': {
        description: 'MatchList DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.matchListRepository.deleteById(id);
  }
}
