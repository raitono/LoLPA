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
import {XrefChampionTag} from '../models';
import {XrefChampionTagRepository} from '../repositories';

export class XrefChampionTagController {
  constructor(
    @repository(XrefChampionTagRepository)
    public xrefChampionTagRepository : XrefChampionTagRepository,
  ) {}

  @post('/xref-champion-tags', {
    responses: {
      '200': {
        description: 'XrefChampionTag model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefChampionTag}}},
      },
    },
  })
  async create(@requestBody() xrefChampionTag: XrefChampionTag): Promise<XrefChampionTag> {
    return await this.xrefChampionTagRepository.create(xrefChampionTag);
  }

  @get('/xref-champion-tags/count', {
    responses: {
      '200': {
        description: 'XrefChampionTag model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(XrefChampionTag)) where?: Where,
  ): Promise<Count> {
    return await this.xrefChampionTagRepository.count(where);
  }

  @get('/xref-champion-tags', {
    responses: {
      '200': {
        description: 'Array of XrefChampionTag model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': XrefChampionTag}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(XrefChampionTag)) filter?: Filter,
  ): Promise<XrefChampionTag[]> {
    return await this.xrefChampionTagRepository.find(filter);
  }

  @patch('/xref-champion-tags', {
    responses: {
      '200': {
        description: 'XrefChampionTag PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() xrefChampionTag: XrefChampionTag,
    @param.query.object('where', getWhereSchemaFor(XrefChampionTag)) where?: Where,
  ): Promise<Count> {
    return await this.xrefChampionTagRepository.updateAll(xrefChampionTag, where);
  }

  @get('/xref-champion-tags/{id}', {
    responses: {
      '200': {
        description: 'XrefChampionTag model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefChampionTag}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<XrefChampionTag> {
    return await this.xrefChampionTagRepository.findById(id);
  }

  @patch('/xref-champion-tags/{id}', {
    responses: {
      '204': {
        description: 'XrefChampionTag PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() xrefChampionTag: XrefChampionTag,
  ): Promise<void> {
    await this.xrefChampionTagRepository.updateById(id, xrefChampionTag);
  }

  @put('/xref-champion-tags/{id}', {
    responses: {
      '204': {
        description: 'XrefChampionTag PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() xrefChampionTag: XrefChampionTag,
  ): Promise<void> {
    try {
      await this.xrefChampionTagRepository.findById(id);
      await this.xrefChampionTagRepository.replaceById(id, xrefChampionTag);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.xrefChampionTagRepository.create(xrefChampionTag);
      } else {
        throw error;
      }
    }
  }

  @del('/xref-champion-tags/{id}', {
    responses: {
      '204': {
        description: 'XrefChampionTag DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.xrefChampionTagRepository.deleteById(id);
  }
}
