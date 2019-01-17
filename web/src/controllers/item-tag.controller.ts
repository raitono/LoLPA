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
import {ItemTag} from '../models';
import {ItemTagRepository} from '../repositories';

export class ItemTagController {
  constructor(
    @repository(ItemTagRepository)
    public itemTagRepository : ItemTagRepository,
  ) {}

  @post('/item-tags', {
    responses: {
      '200': {
        description: 'ItemTag model instance',
        content: {'application/json': {schema: {'x-ts-type': ItemTag}}},
      },
    },
  })
  async create(@requestBody() itemTag: ItemTag): Promise<ItemTag> {
    return await this.itemTagRepository.create(itemTag);
  }

  @get('/item-tags/count', {
    responses: {
      '200': {
        description: 'ItemTag model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ItemTag)) where?: Where,
  ): Promise<Count> {
    return await this.itemTagRepository.count(where);
  }

  @get('/item-tags', {
    responses: {
      '200': {
        description: 'Array of ItemTag model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ItemTag}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ItemTag)) filter?: Filter,
  ): Promise<ItemTag[]> {
    return await this.itemTagRepository.find(filter);
  }

  @patch('/item-tags', {
    responses: {
      '200': {
        description: 'ItemTag PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() itemTag: ItemTag,
    @param.query.object('where', getWhereSchemaFor(ItemTag)) where?: Where,
  ): Promise<Count> {
    return await this.itemTagRepository.updateAll(itemTag, where);
  }

  @get('/item-tags/{id}', {
    responses: {
      '200': {
        description: 'ItemTag model instance',
        content: {'application/json': {schema: {'x-ts-type': ItemTag}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ItemTag> {
    return await this.itemTagRepository.findById(id);
  }

  @patch('/item-tags/{id}', {
    responses: {
      '204': {
        description: 'ItemTag PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() itemTag: ItemTag,
  ): Promise<void> {
    await this.itemTagRepository.updateById(id, itemTag);
  }

  @put('/item-tags/{id}', {
    responses: {
      '204': {
        description: 'ItemTag PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() itemTag: ItemTag,
  ): Promise<void> {
    try {
      await this.itemTagRepository.findById(id);
      await this.itemTagRepository.replaceById(id, itemTag);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.itemTagRepository.create(itemTag);
      } else {
        throw error;
      }
    }
  }

  @del('/item-tags/{id}', {
    responses: {
      '204': {
        description: 'ItemTag DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.itemTagRepository.deleteById(id);
  }
}
