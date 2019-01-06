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
import {ParticipantTimeline} from '../models';
import {ParticipantTimelineRepository} from '../repositories';

export class ParticipantTimelineController {
  constructor(
    @repository(ParticipantTimelineRepository)
    public participantTimelineRepository : ParticipantTimelineRepository,
  ) {}

  @post('/participant-timelines', {
    responses: {
      '200': {
        description: 'ParticipantTimeline model instance',
        content: {'application/json': {schema: {'x-ts-type': ParticipantTimeline}}},
      },
    },
  })
  async create(@requestBody() participantTimeline: ParticipantTimeline): Promise<ParticipantTimeline> {
    return await this.participantTimelineRepository.create(participantTimeline);
  }

  @get('/participant-timelines/count', {
    responses: {
      '200': {
        description: 'ParticipantTimeline model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ParticipantTimeline)) where?: Where,
  ): Promise<Count> {
    return await this.participantTimelineRepository.count(where);
  }

  @get('/participant-timelines', {
    responses: {
      '200': {
        description: 'Array of ParticipantTimeline model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ParticipantTimeline}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ParticipantTimeline)) filter?: Filter,
  ): Promise<ParticipantTimeline[]> {
    return await this.participantTimelineRepository.find(filter);
  }

  @patch('/participant-timelines', {
    responses: {
      '200': {
        description: 'ParticipantTimeline PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() participantTimeline: ParticipantTimeline,
    @param.query.object('where', getWhereSchemaFor(ParticipantTimeline)) where?: Where,
  ): Promise<Count> {
    return await this.participantTimelineRepository.updateAll(participantTimeline, where);
  }

  @get('/participant-timelines/{id}', {
    responses: {
      '200': {
        description: 'ParticipantTimeline model instance',
        content: {'application/json': {schema: {'x-ts-type': ParticipantTimeline}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ParticipantTimeline> {
    return await this.participantTimelineRepository.findById(id);
  }

  @patch('/participant-timelines/{id}', {
    responses: {
      '204': {
        description: 'ParticipantTimeline PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() participantTimeline: ParticipantTimeline,
  ): Promise<void> {
    await this.participantTimelineRepository.updateById(id, participantTimeline);
  }

  @put('/participant-timelines/{id}', {
    responses: {
      '204': {
        description: 'ParticipantTimeline PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() participantTimeline: ParticipantTimeline,
  ): Promise<void> {
    await this.participantTimelineRepository.replaceById(id, participantTimeline);
  }

  @del('/participant-timelines/{id}', {
    responses: {
      '204': {
        description: 'ParticipantTimeline DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.participantTimelineRepository.deleteById(id);
  }
}
