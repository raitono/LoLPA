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
import {ParticipantTimelineDelta} from '../models';
import {ParticipantTimelineDeltaRepository} from '../repositories';

export class ParticipantTimelineDeltaController {
  constructor(
    @repository(ParticipantTimelineDeltaRepository)
    public participantTimelineDeltaRepository : ParticipantTimelineDeltaRepository,
  ) {}

  @post('/participant-timeline-deltas', {
    responses: {
      '200': {
        description: 'ParticipantTimelineDelta model instance',
        content: {'application/json': {schema: {'x-ts-type': ParticipantTimelineDelta}}},
      },
    },
  })
  async create(@requestBody() participantTimelineDelta: ParticipantTimelineDelta): Promise<ParticipantTimelineDelta> {
    return await this.participantTimelineDeltaRepository.create(participantTimelineDelta);
  }

  @post('/participant-timeline-deltas/batch', {
    responses: {
      '200': {
        description: 'Array of ParticipantTimelineDelta model instances',
        content: {'application/json': {schema: {
          type: 'array',
          items: {
            'x-ts-type': ParticipantTimelineDelta,
          },
        }}},
      },
    },
  })
  async createBatch(@requestBody() participantTimelineDeltas: ParticipantTimelineDelta[]): Promise<void> {
    let sql: string = 'INSERT INTO participant_timeline_delta(participantId, deltaTypeId, increment, `value`)VALUES';

    participantTimelineDeltas.forEach((d, i) => {
      sql = sql+'(' + d.participantId + ',' + d.deltaTypeId + ',\'' + d.increment + '\',' + d.value + ')';
      if (i !== participantTimelineDeltas.length - 1){
        sql = sql + ',';
      }
    });

    await this.participantTimelineDeltaRepository.dataSource.execute(sql);
  }

  @get('/participant-timeline-deltas/count', {
    responses: {
      '200': {
        description: 'ParticipantTimelineDelta model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ParticipantTimelineDelta)) where?: Where,
  ): Promise<Count> {
    return await this.participantTimelineDeltaRepository.count(where);
  }

  @get('/participant-timeline-deltas', {
    responses: {
      '200': {
        description: 'Array of ParticipantTimelineDelta model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ParticipantTimelineDelta}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ParticipantTimelineDelta)) filter?: Filter,
  ): Promise<ParticipantTimelineDelta[]> {
    return await this.participantTimelineDeltaRepository.find(filter);
  }

  @patch('/participant-timeline-deltas', {
    responses: {
      '200': {
        description: 'ParticipantTimelineDelta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() participantTimelineDelta: ParticipantTimelineDelta,
    @param.query.object('where', getWhereSchemaFor(ParticipantTimelineDelta)) where?: Where,
  ): Promise<Count> {
    return await this.participantTimelineDeltaRepository.updateAll(participantTimelineDelta, where);
  }

  @get('/participant-timeline-deltas/{id}', {
    responses: {
      '200': {
        description: 'ParticipantTimelineDelta model instance',
        content: {'application/json': {schema: {'x-ts-type': ParticipantTimelineDelta}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ParticipantTimelineDelta> {
    return await this.participantTimelineDeltaRepository.findById(id);
  }

  @patch('/participant-timeline-deltas/{id}', {
    responses: {
      '204': {
        description: 'ParticipantTimelineDelta PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() participantTimelineDelta: ParticipantTimelineDelta,
  ): Promise<void> {
    await this.participantTimelineDeltaRepository.updateById(id, participantTimelineDelta);
  }

  @put('/participant-timeline-deltas/{id}', {
    responses: {
      '204': {
        description: 'ParticipantTimelineDelta PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() participantTimelineDelta: ParticipantTimelineDelta,
  ): Promise<void> {
    try {
      await this.participantTimelineDeltaRepository.findById(id);
      await this.participantTimelineDeltaRepository.replaceById(id, participantTimelineDelta);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.participantTimelineDeltaRepository.create(participantTimelineDelta);
      } else {
        throw error;
      }
    }
  }

  @del('/participant-timeline-deltas/{id}', {
    responses: {
      '204': {
        description: 'ParticipantTimelineDelta DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.participantTimelineDeltaRepository.deleteById(id);
  }
}
