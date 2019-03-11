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
import {Metadata} from '../models';
import {MetadataRepository} from '../repositories';

export class MetadataController {
  constructor(
    @repository(MetadataRepository)
    public metadataRepository : MetadataRepository,
  ) {}

  @post('/metadata', {
    responses: {
      '200': {
        description: 'Metadata model instance',
        content: {'application/json': {schema: {'x-ts-type': Metadata}}},
      },
    },
  })
  async create(@requestBody() metadata: Metadata): Promise<Metadata> {
    return await this.metadataRepository.create(metadata);
  }

  @get('/metadata/count', {
    responses: {
      '200': {
        description: 'Metadata model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Metadata)) where?: Where,
  ): Promise<Count> {
    return await this.metadataRepository.count(where);
  }

  @get('/metadata', {
    responses: {
      '200': {
        description: 'Array of Metadata model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Metadata}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Metadata)) filter?: Filter,
  ): Promise<Metadata[]> {
    return await this.metadataRepository.find(filter);
  }

  @patch('/metadata', {
    responses: {
      '200': {
        description: 'Metadata PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() metadata: Metadata,
    @param.query.object('where', getWhereSchemaFor(Metadata)) where?: Where,
  ): Promise<Count> {
    return await this.metadataRepository.updateAll(metadata, where);
  }

  @get('/metadata/{id}', {
    responses: {
      '200': {
        description: 'Metadata model instance',
        content: {'application/json': {schema: {'x-ts-type': Metadata}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Metadata> {
    return await this.metadataRepository.findById(id);
  }

  @patch('/metadata/{id}', {
    responses: {
      '204': {
        description: 'Metadata PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() metadata: Metadata,
  ): Promise<void> {
    await this.metadataRepository.updateById(id, metadata);
  }

  @put('/metadata/{id}', {
    responses: {
      '204': {
        description: 'Metadata PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() metadata: Metadata,
  ): Promise<void> {
    await this.metadataRepository.replaceById(id, metadata);
  }

  @del('/metadata/{id}', {
    responses: {
      '204': {
        description: 'Metadata DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.metadataRepository.deleteById(id);
  }
}
