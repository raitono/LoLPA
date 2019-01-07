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
import {XrefSummonerGame} from '../models';
import {XrefSummonerGameRepository} from '../repositories';

export class XrefSummonerGameController {
  constructor(
    @repository(XrefSummonerGameRepository)
    public xrefSummonerGameRepository : XrefSummonerGameRepository,
  ) {}

  @post('/xref-summoner-games', {
    responses: {
      '200': {
        description: 'XrefSummonerGame model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefSummonerGame}}},
      },
    },
  })
  async create(@requestBody() xrefSummonerGame: XrefSummonerGame): Promise<XrefSummonerGame> {
    return await this.xrefSummonerGameRepository.create(xrefSummonerGame);
  }

  @get('/xref-summoner-games/count', {
    responses: {
      '200': {
        description: 'XrefSummonerGame model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(XrefSummonerGame)) where?: Where,
  ): Promise<Count> {
    return await this.xrefSummonerGameRepository.count(where);
  }

  @get('/xref-summoner-games', {
    responses: {
      '200': {
        description: 'Array of XrefSummonerGame model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': XrefSummonerGame}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(XrefSummonerGame)) filter?: Filter,
  ): Promise<XrefSummonerGame[]> {
    return await this.xrefSummonerGameRepository.find(filter);
  }

  @patch('/xref-summoner-games', {
    responses: {
      '200': {
        description: 'XrefSummonerGame PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() xrefSummonerGame: XrefSummonerGame,
    @param.query.object('where', getWhereSchemaFor(XrefSummonerGame)) where?: Where,
  ): Promise<Count> {
    return await this.xrefSummonerGameRepository.updateAll(xrefSummonerGame, where);
  }

  @get('/xref-summoner-games/{id}', {
    responses: {
      '200': {
        description: 'XrefSummonerGame model instance',
        content: {'application/json': {schema: {'x-ts-type': XrefSummonerGame}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<XrefSummonerGame> {
    return await this.xrefSummonerGameRepository.findById(id);
  }

  @patch('/xref-summoner-games/{id}', {
    responses: {
      '204': {
        description: 'XrefSummonerGame PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() xrefSummonerGame: XrefSummonerGame,
  ): Promise<void> {
    await this.xrefSummonerGameRepository.updateById(id, xrefSummonerGame);
  }

  @put('/xref-summoner-games/{id}', {
    responses: {
      '204': {
        description: 'XrefSummonerGame PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() xrefSummonerGame: XrefSummonerGame,
  ): Promise<void> {
    try {
      await this.xrefSummonerGameRepository.findById(id);
      await this.xrefSummonerGameRepository.replaceById(id, xrefSummonerGame);
    } catch (error) {
      if (error.statusCode === 404) {
        await this.xrefSummonerGameRepository.create(xrefSummonerGame);
      } else {
        throw error;
      }
    }
  }

  @del('/xref-summoner-games/{id}', {
    responses: {
      '204': {
        description: 'XrefSummonerGame DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.xrefSummonerGameRepository.deleteById(id);
  }
}
