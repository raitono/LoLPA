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
import {XrefItemMap} from '../models';
import {XrefItemMapRepository} from '../repositories';

export class XrefItemMapController {
  constructor(
    @repository(XrefItemMapRepository)
    public xrefItemMapRepository : XrefItemMapRepository,
  ) {}

  @post('/xref-item-maps', {
    responses: {
      '200': {
        description: 'XrefItemMap model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefItemMap}}},
      },
    },
  })
  async create(@requestBody() xrefItemMap: XrefItemMap): Promise<XrefItemMap> {
    return await this.xrefItemMapRepository.create(xrefItemMap);
  }

  @get('/xref-item-maps/count', {
    responses: {
      '200': {
        description: 'XrefItemMap model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(XrefItemMap)) where?: Where,
  ): Promise<Count> {
    return await this.xrefItemMapRepository.count(where);
  }

  @get('/xref-item-maps', {
    responses: {
      '200': {
        description: 'Array of XrefItemMap model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': XrefItemMap}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(XrefItemMap)) filter?: Filter,
  ): Promise<XrefItemMap[]> {
    return await this.xrefItemMapRepository.find(filter);
  }

  @patch('/xref-item-maps', {
    responses: {
      '200': {
        description: 'XrefItemMap PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() xrefItemMap: XrefItemMap,
    @param.query.object('where', getWhereSchemaFor(XrefItemMap)) where?: Where,
  ): Promise<Count> {
    return await this.xrefItemMapRepository.updateAll(xrefItemMap, where);
  }

  @get('/xref-item-maps/{id}', {
    responses: {
      '200': {
        description: 'XrefItemMap model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefItemMap}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<XrefItemMap> {
    return await this.xrefItemMapRepository.findById(id);
  }

  @patch('/xref-item-maps/{id}', {
    responses: {
      '204': {
        description: 'XrefItemMap PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() xrefItemMap: XrefItemMap,
  ): Promise<void> {
    await this.xrefItemMapRepository.updateById(id, xrefItemMap);
  }

  @put('/xref-item-maps/{id}', {
    responses: {
      '204': {
        description: 'XrefItemMap PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() xrefItemMap: XrefItemMap,
  ): Promise<void> {
    try {
      await this.xrefItemMapRepository.findById(id);
      await this.xrefItemMapRepository.replaceById(id, xrefItemMap);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.xrefItemMapRepository.create(xrefItemMap);
      } else {
        throw error;
      }
    }
  }

  @put('/xref-item-maps/{itemId}/{mapId}', {
    responses: {
      '204': {
        description: 'XrefItemMap PUT success',
      },
    },
  })
  async replaceByCompositeId(
    @param.path.number('itemId') itemId: number,
    @param.path.number('mapId') mapId: number,
    @requestBody() xrefItemMap: XrefItemMap,
  ): Promise<void> {
    const xrefs = await this.xrefItemMapRepository.find({where: {itemId: itemId, mapId: mapId}});
    if (xrefs[0]) {
      await this.xrefItemMapRepository.replaceById(xrefs[0].id, xrefItemMap);
    } else {
      await this.xrefItemMapRepository.create(xrefItemMap);
    }
  }

  @del('/xref-item-maps/{id}', {
    responses: {
      '204': {
        description: 'XrefItemMap DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.xrefItemMapRepository.deleteById(id);
  }
}
