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
import {DeltaType} from '../models';
import {DeltaTypeRepository} from '../repositories';

export class DeltaTypeController {
  constructor(
    @repository(DeltaTypeRepository)
    public deltaTypeRepository : DeltaTypeRepository,
  ) {}

  @post('/delta-types', {
    responses: {
      '200': {
        description: 'DeltaType model instance',
        content: {'application/json': {schema: {'x-ts-type': DeltaType}}},
      },
    },
  })
  async create(@requestBody() deltaType: DeltaType): Promise<DeltaType> {
    return await this.deltaTypeRepository.create(deltaType);
  }

  @get('/delta-types/count', {
    responses: {
      '200': {
        description: 'DeltaType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(DeltaType)) where?: Where,
  ): Promise<Count> {
    return await this.deltaTypeRepository.count(where);
  }

  @get('/delta-types', {
    responses: {
      '200': {
        description: 'Array of DeltaType model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': DeltaType}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DeltaType)) filter?: Filter,
  ): Promise<DeltaType[]> {
    return await this.deltaTypeRepository.find(filter);
  }

  @patch('/delta-types', {
    responses: {
      '200': {
        description: 'DeltaType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() deltaType: DeltaType,
    @param.query.object('where', getWhereSchemaFor(DeltaType)) where?: Where,
  ): Promise<Count> {
    return await this.deltaTypeRepository.updateAll(deltaType, where);
  }

  @get('/delta-types/{id}', {
    responses: {
      '200': {
        description: 'DeltaType model instance',
        content: {'application/json': {schema: {'x-ts-type': DeltaType}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<DeltaType> {
    return await this.deltaTypeRepository.findById(id);
  }

  @patch('/delta-types/{id}', {
    responses: {
      '204': {
        description: 'DeltaType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() deltaType: DeltaType,
  ): Promise<void> {
    await this.deltaTypeRepository.updateById(id, deltaType);
  }

  @put('/delta-types/{id}', {
    responses: {
      '204': {
        description: 'DeltaType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() deltaType: DeltaType,
  ): Promise<void> {
    try {
      await this.deltaTypeRepository.findById(id);
      await this.deltaTypeRepository.replaceById(id, deltaType);
    } catch (error) {
      if (error.statusCode === 404) {
        await this.deltaTypeRepository.create(deltaType);
      } else {
        throw error;
      }
    }
  }

  @del('/delta-types/{id}', {
    responses: {
      '204': {
        description: 'DeltaType DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.deltaTypeRepository.deleteById(id);
  }
}
