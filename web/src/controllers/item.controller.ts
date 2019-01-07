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
import {Item} from '../models';
import {ItemRepository} from '../repositories';

export class ItemController {
  constructor(
    @repository(ItemRepository)
    public itemRepository : ItemRepository,
  ) {}

  @post('/items', {
    responses: {
      '200': {
        description: 'Item model instance',
        content: {'application/json': {schema: {'x-ts-type': Item}}},
      },
    },
  })
  async create(@requestBody() item: Item): Promise<Item> {
    return await this.itemRepository.create(item);
  }

  @get('/items/count', {
    responses: {
      '200': {
        description: 'Item model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where,
  ): Promise<Count> {
    return await this.itemRepository.count(where);
  }

  @get('/items', {
    responses: {
      '200': {
        description: 'Array of Item model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Item}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Item)) filter?: Filter,
  ): Promise<Item[]> {
    return await this.itemRepository.find(filter);
  }

  @patch('/items', {
    responses: {
      '200': {
        description: 'Item PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() item: Item,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where,
  ): Promise<Count> {
    return await this.itemRepository.updateAll(item, where);
  }

  @get('/items/{id}', {
    responses: {
      '200': {
        description: 'Item model instance',
        content: {'application/json': {schema: {'x-ts-type': Item}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Item> {
    return await this.itemRepository.findById(id);
  }

  @patch('/items/{id}', {
    responses: {
      '204': {
        description: 'Item PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() item: Item,
  ): Promise<void> {
    await this.itemRepository.updateById(id, item);
  }

  @put('/items/{id}', {
    responses: {
      '204': {
        description: 'Item PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() item: Item,
  ): Promise<void> {
    try {
      await this.itemRepository.findById(id);
      await this.itemRepository.replaceById(id, item);
    } catch (error) {
      if (error.statusCode === 404) {
        await this.itemRepository.create(item);
      } else {
        throw error;
      }
    }
  }

  @del('/items/{id}', {
    responses: {
      '204': {
        description: 'Item DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.itemRepository.deleteById(id);
  }
}
