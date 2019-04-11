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
import { mysql_real_escape_string } from '../../util/common';
const fs = require('fs');

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

  @post('/items/batch', {
    responses: {
      '204': {
        description: 'Array of Item model instances',
        content: {'application/json': {schema: {
          type: 'array',
          items: {
            'x-ts-type': Item,
          },
        }}},
      },
    },
  })
  async createBatch(@requestBody() items: Item[]): Promise<void> {
    if(items.length === 0){
      return;
    }
    let sql: string = 'INSERT INTO `item`(itemId, `name`, `version`, description, colloq, plaintext, goldBase, purchasable, goldTotal, goldSellsFor, depth, `from`, `into`, hideFromAll, consumed, consumeOnFull, requiredAlly, requiredChampion, specialRecipe, stacks, inStore)VALUES';

    items.forEach((o, i) => {
      sql = sql+'(' + o.itemId + ',\'' + mysql_real_escape_string(o.name) + '\',\'' + o.version + '\',' + (o.description ? '\'' + mysql_real_escape_string(o.description) + '\'' : 'NULL')
      + ',' + (o.colloq ? '\'' + mysql_real_escape_string(o.colloq) + '\'' : 'NULL') + ',' + (o.plaintext ? '\'' + mysql_real_escape_string(o.plaintext) + '\'' : 'NULL') + ','
      + o.goldBase + ',' + o.purchasable + ',' + o.goldTotal + ',' + o.goldSellsFor + ',' + (o.depth ? o.depth : 1) + ','
      + (o.from ? '\'' + o.from + '\'' : 'NULL') + ',' + (o.into ? '\'' + o.into + '\'' : 'NULL') + ','
      + (o.hideFromAll ? o.hideFromAll : 'NULL') + ',' + (o.consumed ? o.consumed : 'NULL') + ','
      + (o.consumeOnFull ? o.consumeOnFull : 'NULL') + ',' + (o.requiredAlly ? '\'' + o.requiredAlly + '\'' : 'NULL') + ','
      + (o.requiredChampion ? '\'' + o.requiredChampion + '\'' : 'NULL') + ',' + (o.specialRecipe ? o.specialRecipe : 'NULL') + ','
      + (o.stacks ? o.stacks : 'NULL') + ',' + (o.inStore ? o.inStore : 'NULL') + ')';
      if (i !== items.length - 1){
        sql = sql + ',';
      }
    });

    sql = sql+'ON DUPLICATE KEY UPDATE version = VALUES(version)';

    await this.itemRepository.dataSource.execute(sql);
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
      if (error.code === 'ENTITY_NOT_FOUND') {
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
