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
import {XrefParticipantPerk} from '../models';
import {XrefParticipantPerkRepository} from '../repositories';

export class XrefParticipantPerkController {
  constructor(
    @repository(XrefParticipantPerkRepository)
    public xrefParticipantPerkRepository : XrefParticipantPerkRepository,
  ) {}

  @post('/xref-participant-perks', {
    responses: {
      '200': {
        description: 'XrefParticipantPerk model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefParticipantPerk}}},
      },
    },
  })
  async create(@requestBody() xrefParticipantPerk: XrefParticipantPerk): Promise<XrefParticipantPerk> {
    return await this.xrefParticipantPerkRepository.create(xrefParticipantPerk);
  }

  @get('/xref-participant-perks/count', {
    responses: {
      '200': {
        description: 'XrefParticipantPerk model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(XrefParticipantPerk)) where?: Where,
  ): Promise<Count> {
    return await this.xrefParticipantPerkRepository.count(where);
  }

  @get('/xref-participant-perks', {
    responses: {
      '200': {
        description: 'Array of XrefParticipantPerk model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': XrefParticipantPerk}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(XrefParticipantPerk)) filter?: Filter,
  ): Promise<XrefParticipantPerk[]> {
    return await this.xrefParticipantPerkRepository.find(filter);
  }

  @patch('/xref-participant-perks', {
    responses: {
      '200': {
        description: 'XrefParticipantPerk PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() xrefParticipantPerk: XrefParticipantPerk,
    @param.query.object('where', getWhereSchemaFor(XrefParticipantPerk)) where?: Where,
  ): Promise<Count> {
    return await this.xrefParticipantPerkRepository.updateAll(xrefParticipantPerk, where);
  }

  @get('/xref-participant-perks/{id}', {
    responses: {
      '200': {
        description: 'XrefParticipantPerk model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefParticipantPerk}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<XrefParticipantPerk> {
    return await this.xrefParticipantPerkRepository.findById(id);
  }

  @patch('/xref-participant-perks/{id}', {
    responses: {
      '204': {
        description: 'XrefParticipantPerk PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() xrefParticipantPerk: XrefParticipantPerk,
  ): Promise<void> {
    await this.xrefParticipantPerkRepository.updateById(id, xrefParticipantPerk);
  }

  @put('/xref-participant-perks/{id}', {
    responses: {
      '204': {
        description: 'XrefParticipantPerk PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() xrefParticipantPerk: XrefParticipantPerk,
  ): Promise<void> {
    await this.xrefParticipantPerkRepository.replaceById(id, xrefParticipantPerk);
  }

  @del('/xref-participant-perks/{id}', {
    responses: {
      '204': {
        description: 'XrefParticipantPerk DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.xrefParticipantPerkRepository.deleteById(id);
  }
}
