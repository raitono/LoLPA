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
import {Perk} from '../models';
import {PerkRepository} from '../repositories';

export class PerkController {
  constructor(
    @repository(PerkRepository)
    public perkRepository : PerkRepository,
  ) {}

  @post('/perks', {
    responses: {
      '200': {
        description: 'Perk model instance',
        content: {'application/json': {schema: {'x-ts-type': Perk}}},
      },
    },
  })
  async create(@requestBody() perk: Perk): Promise<Perk> {
    return await this.perkRepository.create(perk);
  }

  @get('/perks/count', {
    responses: {
      '200': {
        description: 'Perk model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Perk)) where?: Where,
  ): Promise<Count> {
    return await this.perkRepository.count(where);
  }

  @get('/perks', {
    responses: {
      '200': {
        description: 'Array of Perk model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Perk}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Perk)) filter?: Filter,
  ): Promise<Perk[]> {
    return await this.perkRepository.find(filter);
  }

  @patch('/perks', {
    responses: {
      '200': {
        description: 'Perk PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() perk: Perk,
    @param.query.object('where', getWhereSchemaFor(Perk)) where?: Where,
  ): Promise<Count> {
    return await this.perkRepository.updateAll(perk, where);
  }

  @get('/perks/{id}', {
    responses: {
      '200': {
        description: 'Perk model instance',
        content: {'application/json': {schema: {'x-ts-type': Perk}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Perk> {
    return await this.perkRepository.findById(id);
  }

  @patch('/perks/{id}', {
    responses: {
      '204': {
        description: 'Perk PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() perk: Perk,
  ): Promise<void> {
    await this.perkRepository.updateById(id, perk);
  }

  @put('/perks/{id}', {
    responses: {
      '204': {
        description: 'Perk PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() perk: Perk,
  ): Promise<void> {
    try {
      await this.perkRepository.findById(id);
      await this.perkRepository.replaceById(id, perk);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.perkRepository.create(perk);
      } else {
        throw error;
      }
    }
  }

  @del('/perks/{id}', {
    responses: {
      '204': {
        description: 'Perk DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.perkRepository.deleteById(id);
  }
}
