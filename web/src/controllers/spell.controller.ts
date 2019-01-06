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
import {Spell} from '../models';
import {SpellRepository} from '../repositories';

export class SpellController {
  constructor(
    @repository(SpellRepository)
    public spellRepository : SpellRepository,
  ) {}

  @post('/spells', {
    responses: {
      '200': {
        description: 'Spell model instance',
        content: {'application/json': {schema: {'x-ts-type': Spell}}},
      },
    },
  })
  async create(@requestBody() spell: Spell): Promise<Spell> {
    return await this.spellRepository.create(spell);
  }

  @get('/spells/count', {
    responses: {
      '200': {
        description: 'Spell model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Spell)) where?: Where,
  ): Promise<Count> {
    return await this.spellRepository.count(where);
  }

  @get('/spells', {
    responses: {
      '200': {
        description: 'Array of Spell model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Spell}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Spell)) filter?: Filter,
  ): Promise<Spell[]> {
    return await this.spellRepository.find(filter);
  }

  @patch('/spells', {
    responses: {
      '200': {
        description: 'Spell PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() spell: Spell,
    @param.query.object('where', getWhereSchemaFor(Spell)) where?: Where,
  ): Promise<Count> {
    return await this.spellRepository.updateAll(spell, where);
  }

  @get('/spells/{id}', {
    responses: {
      '200': {
        description: 'Spell model instance',
        content: {'application/json': {schema: {'x-ts-type': Spell}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Spell> {
    return await this.spellRepository.findById(id);
  }

  @patch('/spells/{id}', {
    responses: {
      '204': {
        description: 'Spell PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() spell: Spell,
  ): Promise<void> {
    await this.spellRepository.updateById(id, spell);
  }

  @put('/spells/{id}', {
    responses: {
      '204': {
        description: 'Spell PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() spell: Spell,
  ): Promise<void> {
    await this.spellRepository.replaceById(id, spell);
  }

  @del('/spells/{id}', {
    responses: {
      '204': {
        description: 'Spell DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.spellRepository.deleteById(id);
  }
}
