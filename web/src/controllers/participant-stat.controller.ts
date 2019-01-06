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
import {ParticipantStat} from '../models';
import {ParticipantStatRepository} from '../repositories';

export class ParticipantStatController {
  constructor(
    @repository(ParticipantStatRepository)
    public participantStatRepository : ParticipantStatRepository,
  ) {}

  @post('/participant-stats', {
    responses: {
      '200': {
        description: 'ParticipantStat model instance',
        content: {'application/json': {schema: {'x-ts-type': ParticipantStat}}},
      },
    },
  })
  async create(@requestBody() participantStat: ParticipantStat): Promise<ParticipantStat> {
    return await this.participantStatRepository.create(participantStat);
  }

  @get('/participant-stats/count', {
    responses: {
      '200': {
        description: 'ParticipantStat model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ParticipantStat)) where?: Where,
  ): Promise<Count> {
    return await this.participantStatRepository.count(where);
  }

  @get('/participant-stats', {
    responses: {
      '200': {
        description: 'Array of ParticipantStat model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ParticipantStat}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ParticipantStat)) filter?: Filter,
  ): Promise<ParticipantStat[]> {
    return await this.participantStatRepository.find(filter);
  }

  @patch('/participant-stats', {
    responses: {
      '200': {
        description: 'ParticipantStat PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() participantStat: ParticipantStat,
    @param.query.object('where', getWhereSchemaFor(ParticipantStat)) where?: Where,
  ): Promise<Count> {
    return await this.participantStatRepository.updateAll(participantStat, where);
  }

  @get('/participant-stats/{id}', {
    responses: {
      '200': {
        description: 'ParticipantStat model instance',
        content: {'application/json': {schema: {'x-ts-type': ParticipantStat}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ParticipantStat> {
    return await this.participantStatRepository.findById(id);
  }

  @patch('/participant-stats/{id}', {
    responses: {
      '204': {
        description: 'ParticipantStat PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() participantStat: ParticipantStat,
  ): Promise<void> {
    await this.participantStatRepository.updateById(id, participantStat);
  }

  @put('/participant-stats/{id}', {
    responses: {
      '204': {
        description: 'ParticipantStat PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() participantStat: ParticipantStat,
  ): Promise<void> {
    await this.participantStatRepository.replaceById(id, participantStat);
  }

  @del('/participant-stats/{id}', {
    responses: {
      '204': {
        description: 'ParticipantStat DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.participantStatRepository.deleteById(id);
  }
}
