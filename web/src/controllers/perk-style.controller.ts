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
import {PerkStyle} from '../models';
import {PerkStyleRepository} from '../repositories';

export class PerkStyleController {
  constructor(
    @repository(PerkStyleRepository)
    public perkStyleRepository : PerkStyleRepository,
  ) {}

  @post('/perk-styles', {
    responses: {
      '200': {
        description: 'PerkStyle model instance',
        content: {'application/json': {schema: {'x-ts-type': PerkStyle}}},
      },
    },
  })
  async create(@requestBody() perkStyle: PerkStyle): Promise<PerkStyle> {
    return await this.perkStyleRepository.create(perkStyle);
  }

  @get('/perk-styles/count', {
    responses: {
      '200': {
        description: 'PerkStyle model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PerkStyle)) where?: Where,
  ): Promise<Count> {
    return await this.perkStyleRepository.count(where);
  }

  @get('/perk-styles', {
    responses: {
      '200': {
        description: 'Array of PerkStyle model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': PerkStyle}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PerkStyle)) filter?: Filter,
  ): Promise<PerkStyle[]> {
    return await this.perkStyleRepository.find(filter);
  }

  @patch('/perk-styles', {
    responses: {
      '200': {
        description: 'PerkStyle PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() perkStyle: PerkStyle,
    @param.query.object('where', getWhereSchemaFor(PerkStyle)) where?: Where,
  ): Promise<Count> {
    return await this.perkStyleRepository.updateAll(perkStyle, where);
  }

  @get('/perk-styles/{id}', {
    responses: {
      '200': {
        description: 'PerkStyle model instance',
        content: {'application/json': {schema: {'x-ts-type': PerkStyle}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<PerkStyle> {
    return await this.perkStyleRepository.findById(id);
  }

  @patch('/perk-styles/{id}', {
    responses: {
      '204': {
        description: 'PerkStyle PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() perkStyle: PerkStyle,
  ): Promise<void> {
    await this.perkStyleRepository.updateById(id, perkStyle);
  }

  @put('/perk-styles/{id}', {
    responses: {
      '204': {
        description: 'PerkStyle PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() perkStyle: PerkStyle,
  ): Promise<void> {
    try {
      await this.perkStyleRepository.findById(id);
      await this.perkStyleRepository.replaceById(id, perkStyle);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.perkStyleRepository.create(perkStyle);
      } else {
        throw error;
      }
    }
  }

  @del('/perk-styles/{id}', {
    responses: {
      '204': {
        description: 'PerkStyle DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.perkStyleRepository.deleteById(id);
  }
}
