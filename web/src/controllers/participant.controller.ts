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
import {Participant} from '../models';
import {ParticipantRepository} from '../repositories';

export class ParticipantController {
  constructor(
    @repository(ParticipantRepository)
    public participantRepository : ParticipantRepository,
  ) {}

  @post('/participants', {
    responses: {
      '200': {
        description: 'Participant model instance',
        content: {'application/json': {schema: {'x-ts-type': Participant}}},
      },
    },
  })
  async create(@requestBody() participant: Participant): Promise<Participant> {
    return await this.participantRepository.create(participant);
  }

  @get('/participants/count', {
    responses: {
      '200': {
        description: 'Participant model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Participant)) where?: Where,
  ): Promise<Count> {
    return await this.participantRepository.count(where);
  }

  @get('/participants', {
    responses: {
      '200': {
        description: 'Array of Participant model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Participant}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Participant)) filter?: Filter,
  ): Promise<Participant[]> {
    return await this.participantRepository.find(filter);
  }

  @patch('/participants', {
    responses: {
      '200': {
        description: 'Participant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() participant: Participant,
    @param.query.object('where', getWhereSchemaFor(Participant)) where?: Where,
  ): Promise<Count> {
    return await this.participantRepository.updateAll(participant, where);
  }

  @get('/participants/{id}', {
    responses: {
      '200': {
        description: 'Participant model instance',
        content: {'application/json': {schema: {'x-ts-type': Participant}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Participant> {
    return await this.participantRepository.findById(id);
  }

  @patch('/participants/{id}', {
    responses: {
      '204': {
        description: 'Participant PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() participant: Participant,
  ): Promise<void> {
    await this.participantRepository.updateById(id, participant);
  }

  @put('/participants/{id}', {
    responses: {
      '204': {
        description: 'Participant PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() participant: Participant,
  ): Promise<void> {
    try {
      await this.participantRepository.findById(id);
      await this.participantRepository.replaceById(id, participant);
    } catch (error) {
      if (error.statusCode === 404) {
        await this.participantRepository.create(participant);
      } else {
        throw error;
      }
    }
  }

  @del('/participants/{id}', {
    responses: {
      '204': {
        description: 'Participant DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.participantRepository.deleteById(id);
  }
}
