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
import {XrefParticipantItem} from '../models';
import {XrefParticipantItemRepository} from '../repositories';

export class XrefParticipantItemController {
  constructor(
    @repository(XrefParticipantItemRepository)
    public xrefParticipantItemRepository : XrefParticipantItemRepository,
  ) {}

  @post('/xref-participant-items', {
    responses: {
      '200': {
        description: 'XrefParticipantItem model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefParticipantItem}}},
      },
    },
  })
  async create(@requestBody() xrefParticipantItem: XrefParticipantItem): Promise<XrefParticipantItem> {
    return await this.xrefParticipantItemRepository.create(xrefParticipantItem);
  }

  @post('/xref-participant-items/batch', {
    responses: {
      '204': {
        description: 'Array of XrefParticipantItem model instances',
        content: {'application/json': {schema: {
          type: 'array',
          items: {
            'x-ts-type': XrefParticipantItem,
          },
        }}},
      },
    },
  })
  async createBatch(@requestBody() xrefParticipantItems: XrefParticipantItem[]): Promise<void> {
    let sql: string = 'INSERT INTO `xref_participant_item`(participantId,itemId)VALUES';

    xrefParticipantItems.forEach((p, i) => {
      sql = sql+'(' + p.participantId + ',' + p.itemId +')';
      if (i !== xrefParticipantItems.length - 1){
        sql = sql + ',';
      }
    });

    await this.xrefParticipantItemRepository.dataSource.execute(sql);
  }

  @get('/xref-participant-items/count', {
    responses: {
      '200': {
        description: 'XrefParticipantItem model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(XrefParticipantItem)) where?: Where,
  ): Promise<Count> {
    return await this.xrefParticipantItemRepository.count(where);
  }

  @get('/xref-participant-items', {
    responses: {
      '200': {
        description: 'Array of XrefParticipantItem model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': XrefParticipantItem}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(XrefParticipantItem)) filter?: Filter,
  ): Promise<XrefParticipantItem[]> {
    return await this.xrefParticipantItemRepository.find(filter);
  }

  @patch('/xref-participant-items', {
    responses: {
      '200': {
        description: 'XrefParticipantItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() xrefParticipantItem: XrefParticipantItem,
    @param.query.object('where', getWhereSchemaFor(XrefParticipantItem)) where?: Where,
  ): Promise<Count> {
    return await this.xrefParticipantItemRepository.updateAll(xrefParticipantItem, where);
  }

  @get('/xref-participant-items/{id}', {
    responses: {
      '200': {
        description: 'XrefParticipantItem model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefParticipantItem}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<XrefParticipantItem> {
    return await this.xrefParticipantItemRepository.findById(id);
  }

  @patch('/xref-participant-items/{id}', {
    responses: {
      '204': {
        description: 'XrefParticipantItem PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() xrefParticipantItem: XrefParticipantItem,
  ): Promise<void> {
    await this.xrefParticipantItemRepository.updateById(id, xrefParticipantItem);
  }

  @put('/xref-participant-items/{id}', {
    responses: {
      '204': {
        description: 'XrefParticipantItem PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() xrefParticipantItem: XrefParticipantItem,
  ): Promise<void> {
    try {
      await this.xrefParticipantItemRepository.findById(id);
      await this.xrefParticipantItemRepository.replaceById(id, xrefParticipantItem);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.xrefParticipantItemRepository.create(xrefParticipantItem);
      } else {
        throw error;
      }
    }
  }

  @del('/xref-participant-items/{id}', {
    responses: {
      '204': {
        description: 'XrefParticipantItem DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.xrefParticipantItemRepository.deleteById(id);
  }
}
