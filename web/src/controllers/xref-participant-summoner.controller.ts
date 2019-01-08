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
import {XrefParticipantSummoner} from '../models';
import {XrefParticipantSummonerRepository} from '../repositories';

export class XrefParticipantSummonerController {
  constructor(
    @repository(XrefParticipantSummonerRepository)
    public xrefParticipantSummonerRepository : XrefParticipantSummonerRepository,
  ) {}

  @post('/xref-participant-summoners', {
    responses: {
      '200': {
        description: 'XrefParticipantSummoner model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefParticipantSummoner}}},
      },
    },
  })
  async create(@requestBody() xrefParticipantSummoner: XrefParticipantSummoner): Promise<XrefParticipantSummoner> {
    return await this.xrefParticipantSummonerRepository.create(xrefParticipantSummoner);
  }

  @get('/xref-participant-summoners/count', {
    responses: {
      '200': {
        description: 'XrefParticipantSummoner model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(XrefParticipantSummoner)) where?: Where,
  ): Promise<Count> {
    return await this.xrefParticipantSummonerRepository.count(where);
  }

  @get('/xref-participant-summoners', {
    responses: {
      '200': {
        description: 'Array of XrefParticipantSummoner model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': XrefParticipantSummoner}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(XrefParticipantSummoner)) filter?: Filter,
  ): Promise<XrefParticipantSummoner[]> {
    return await this.xrefParticipantSummonerRepository.find(filter);
  }

  @patch('/xref-participant-summoners', {
    responses: {
      '200': {
        description: 'XrefParticipantSummoner PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() xrefParticipantSummoner: XrefParticipantSummoner,
    @param.query.object('where', getWhereSchemaFor(XrefParticipantSummoner)) where?: Where,
  ): Promise<Count> {
    return await this.xrefParticipantSummonerRepository.updateAll(xrefParticipantSummoner, where);
  }

  @get('/xref-participant-summoners/{id}', {
    responses: {
      '200': {
        description: 'XrefParticipantSummoner model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefParticipantSummoner}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<XrefParticipantSummoner> {
    return await this.xrefParticipantSummonerRepository.findById(id);
  }

  @patch('/xref-participant-summoners/{id}', {
    responses: {
      '204': {
        description: 'XrefParticipantSummoner PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() xrefParticipantSummoner: XrefParticipantSummoner,
  ): Promise<void> {
    await this.xrefParticipantSummonerRepository.updateById(id, xrefParticipantSummoner);
  }

  @put('/xref-participant-summoners/{id}', {
    responses: {
      '204': {
        description: 'XrefParticipantSummoner PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() xrefParticipantSummoner: XrefParticipantSummoner,
  ): Promise<void> {
    await this.xrefParticipantSummonerRepository.replaceById(id, xrefParticipantSummoner);
  }

  @del('/xref-participant-summoners/{id}', {
    responses: {
      '204': {
        description: 'XrefParticipantSummoner DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.xrefParticipantSummonerRepository.deleteById(id);
  }
}
