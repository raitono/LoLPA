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
import {ItemStat} from '../models';
import {ItemStatRepository} from '../repositories';

export class ItemStatController {
  constructor(
    @repository(ItemStatRepository)
    public itemStatRepository : ItemStatRepository,
  ) {}

  @post('/item-stats', {
    responses: {
      '200': {
        description: 'ItemStat model instance',
        content: {'application/json': {schema: {'x-ts-type': ItemStat}}},
      },
    },
  })
  async create(@requestBody() itemStat: ItemStat): Promise<ItemStat> {
    return await this.itemStatRepository.create(itemStat);
  }

  @get('/item-stats/count', {
    responses: {
      '200': {
        description: 'ItemStat model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ItemStat)) where?: Where,
  ): Promise<Count> {
    return await this.itemStatRepository.count(where);
  }

  @get('/item-stats', {
    responses: {
      '200': {
        description: 'Array of ItemStat model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ItemStat}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ItemStat)) filter?: Filter,
  ): Promise<ItemStat[]> {
    return await this.itemStatRepository.find(filter);
  }

  @patch('/item-stats', {
    responses: {
      '200': {
        description: 'ItemStat PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() itemStat: ItemStat,
    @param.query.object('where', getWhereSchemaFor(ItemStat)) where?: Where,
  ): Promise<Count> {
    return await this.itemStatRepository.updateAll(itemStat, where);
  }

  @get('/item-stats/{id}', {
    responses: {
      '200': {
        description: 'ItemStat model instance',
        content: {'application/json': {schema: {'x-ts-type': ItemStat}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ItemStat> {
    return await this.itemStatRepository.findById(id);
  }

  @patch('/item-stats/{id}', {
    responses: {
      '204': {
        description: 'ItemStat PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() itemStat: ItemStat,
  ): Promise<void> {
    await this.itemStatRepository.updateById(id, itemStat);
  }

  @put('/item-stats/{id}', {
    responses: {
      '204': {
        description: 'ItemStat PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() itemStat: ItemStat,
  ): Promise<void> {
    try {
      await this.itemStatRepository.findById(id);
      await this.itemStatRepository.replaceById(id, itemStat);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.itemStatRepository.create(itemStat);
      } else {
        throw error;
      }
    }
  }

  @put('/item-stats/{itemId}/{type}', {
    responses: {
      '204': {
        description: 'ItemStat PUT success',
      },
    },
  })
  async replaceByCompositeId(
    @param.path.number('itemId') itemId: number,
    @param.path.string('type') type: string,
    @requestBody() itemStat: ItemStat,
  ): Promise<void> {
    const item = await this.itemStatRepository.find({where: {itemId: itemId, type: type}});
    if (item[0]) {
      await this.itemStatRepository.replaceById(item[0].id, itemStat);
    } else {
      await this.itemStatRepository.create(itemStat);
    }
  }

  @del('/item-stats/{id}', {
    responses: {
      '204': {
        description: 'ItemStat DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.itemStatRepository.deleteById(id);
  }
}
