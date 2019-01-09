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
import {Match} from '../models';
import {MatchRepository} from '../repositories';

export class MatchController {
  constructor(
    @repository(MatchRepository)
    public matchRepository : MatchRepository,
  ) {}

  @post('/matches', {
    responses: {
      '200': {
        description: 'Match model instance',
        content: {'application/json': {schema: {'x-ts-type': Match}}},
      },
    },
  })
  async create(@requestBody() match: Match): Promise<Match> {
    return await this.matchRepository.create(match);
  }

  @get('/matches/count', {
    responses: {
      '200': {
        description: 'Match model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where,
  ): Promise<Count> {
    return await this.matchRepository.count(where);
  }

  @get('/matches', {
    responses: {
      '200': {
        description: 'Array of Match model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Match}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Match)) filter?: Filter,
  ): Promise<Match[]> {
    return await this.matchRepository.find(filter);
  }

  @patch('/matches', {
    responses: {
      '200': {
        description: 'Match PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() match: Match,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where,
  ): Promise<Count> {
    return await this.matchRepository.updateAll(match, where);
  }

  @get('/matches/{id}', {
    responses: {
      '200': {
        description: 'Match model instance',
        content: {'application/json': {schema: {'x-ts-type': Match}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Match> {
    return await this.matchRepository.findById(id);
  }

  @patch('/matches/{id}', {
    responses: {
      '204': {
        description: 'Match PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() match: Match,
  ): Promise<void> {
    await this.matchRepository.updateById(id, match);
  }

  @put('/matches/{id}', {
    responses: {
      '204': {
        description: 'Match PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() match: Match,
  ): Promise<void> {
    try {
      await this.matchRepository.findById(id);
      await this.matchRepository.replaceById(id, match);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.matchRepository.create(match);
      } else {
        throw error;
      }
    }
  }

  @del('/matches/{id}', {
    responses: {
      '204': {
        description: 'Match DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.matchRepository.deleteById(id);
  }
}
