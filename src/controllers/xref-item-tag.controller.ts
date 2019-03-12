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
import {XrefItemTag} from '../models';
import {XrefItemTagRepository} from '../repositories';

export class XrefItemTagController {
  constructor(
    @repository(XrefItemTagRepository)
    public xrefItemTagRepository : XrefItemTagRepository,
  ) {}

  @post('/xref-item-tags', {
    responses: {
      '200': {
        description: 'XrefItemTag model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefItemTag}}},
      },
    },
  })
  async create(@requestBody() xrefItemTag: XrefItemTag): Promise<XrefItemTag> {
    return await this.xrefItemTagRepository.create(xrefItemTag);
  }

  @post('/xref-item-tags/batch', {
    responses: {
      '200': {
        description: 'Array of XrefItemTag model instances',
        content: {'application/json': {schema: {
          type: 'array',
          items: {
            'x-ts-type': XrefItemTag,
          },
        }}},
      },
    },
  })
  async createBatch(@requestBody() xrefItemTags: XrefItemTag[]): Promise<void> {
    if(xrefItemTags.length === 0){
      return;
    }
    let sql: string = 'INSERT INTO xref_item_tag(version,itemId,tagId)VALUES';

    xrefItemTags.forEach((x, i) => {
      sql = sql+'(\'' + x.version + '\',' + x.itemId + ',' + x.tagId + ')';
      if (i !== xrefItemTags.length - 1){
        sql = sql + ',';
      }
    });

    await this.xrefItemTagRepository.dataSource.execute(sql);
  }

  @get('/xref-item-tags/count', {
    responses: {
      '200': {
        description: 'XrefItemTag model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(XrefItemTag)) where?: Where,
  ): Promise<Count> {
    return await this.xrefItemTagRepository.count(where);
  }

  @get('/xref-item-tags', {
    responses: {
      '200': {
        description: 'Array of XrefItemTag model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': XrefItemTag}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(XrefItemTag)) filter?: Filter,
  ): Promise<XrefItemTag[]> {
    return await this.xrefItemTagRepository.find(filter);
  }

  @patch('/xref-item-tags', {
    responses: {
      '200': {
        description: 'XrefItemTag PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() xrefItemTag: XrefItemTag,
    @param.query.object('where', getWhereSchemaFor(XrefItemTag)) where?: Where,
  ): Promise<Count> {
    return await this.xrefItemTagRepository.updateAll(xrefItemTag, where);
  }

  @get('/xref-item-tags/{id}', {
    responses: {
      '200': {
        description: 'XrefItemTag model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefItemTag}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<XrefItemTag> {
    return await this.xrefItemTagRepository.findById(id);
  }

  @patch('/xref-item-tags/{id}', {
    responses: {
      '204': {
        description: 'XrefItemTag PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() xrefItemTag: XrefItemTag,
  ): Promise<void> {
    await this.xrefItemTagRepository.updateById(id, xrefItemTag);
  }

  @put('/xref-item-tags/{id}', {
    responses: {
      '204': {
        description: 'XrefItemTag PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() xrefItemTag: XrefItemTag,
  ): Promise<void> {
    try {
      await this.xrefItemTagRepository.findById(id);
      await this.xrefItemTagRepository.replaceById(id, xrefItemTag);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.xrefItemTagRepository.create(xrefItemTag);
      } else {
        throw error;
      }
    }
  }

  @del('/xref-item-tags/{id}', {
    responses: {
      '204': {
        description: 'XrefItemTag DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.xrefItemTagRepository.deleteById(id);
  }
}
