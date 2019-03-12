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
import {ParticipantStat} from '../models';
import {ParticipantStatRepository} from '../repositories';

export class ParticipantStatController {
  constructor(
    @repository(ParticipantStatRepository)
    public participantStatRepository : ParticipantStatRepository,
  ) {}

  @post('/participant-stats', {
    responses: {
      '200': {
        description: 'ParticipantStat model instance',
        content: {'application/json': {schema: {'x-ts-type': ParticipantStat}}},
      },
    },
  })
  async create(@requestBody() participantStat: ParticipantStat): Promise<ParticipantStat> {
    return await this.participantStatRepository.create(participantStat);
  }

  @post('/participant-stats/batch', {
    responses: {
      '204': {
        description: 'Array of ParticipantStat model instances',
        content: {'application/json': {schema: {
          type: 'array',
          items: {
            'x-ts-type': ParticipantStat,
          },
        }}},
      },
    },
  })
  async createBatch(@requestBody() participantStats: ParticipantStat[]): Promise<void> {
    if(participantStats.length === 0){
      return;
    }
    let sql: string = 'INSERT INTO `participant_stat`(participantId,win,kills,deaths,assists,largestKillingSpree,killingSprees,largestMultiKill,doubleKills,tripleKills,quadraKills,pentaKills,unrealKills,physicalDamageDealt,physicalDamageDealtToChampions,magicDamageDealt,magicDamageDealtToChampions,trueDamageDealt,trueDamageDealtToChampions,totalDamageDealtToChampions,damageDealtToObjectives,totalDamageDealt,totalUnitsHealed,totalHeal,largestCriticalStrike,totalMinionsKilled,neutralMinionsKilled,neutralMinionsKilledTeamJungle,neutralMinionsKilledEnemyJungle,sightWardsBoughtInGame,visionWardsBoughtInGame,wardsKilled,wardsPlaced,visionScore,objectivePlayerScore,combatPlayerScore,totalPlayerScore,totalScoreRank,altarsCaptured,teamObjective,totalTimeCrowdControlDealt,timeCCingOthers,longestTimeSpentLiving,turretKills,damageDealtToTurrets,inhibitorKills,firstTowerAssist,firstTowerKill,firstBloodAssist,firstInhibitorKill,firstInhibitorAssist,firstBloodKill,champLevel,nodeNeutralize,nodeNeutralizeAssist,nodeCapture,nodeCaptureAssist,altarsNeutralized,goldEarned,goldSpent,physicalDamageTaken,magicalDamageTaken,trueDamageTaken,totalDamageTaken,perkPrimaryStyle,perkSubStyle,statPerk0,statPerk1,statPerk2,damageSelfMitigated)VALUES';

    participantStats.forEach((p, i) => {
      sql = sql+'(' + p.participantId + ',' + p.win + ',' + p.kills + ',' + p.deaths + ',' + p.assists + ',' + p.largestKillingSpree + ',' + p.killingSprees + ',' + p.largestMultiKill + ',' + p.doubleKills + ',' + p.tripleKills + ',' + p.quadraKills + ',' + p.pentaKills + ',' + p.unrealKills + ',' + p.physicalDamageDealt + ',' + p.physicalDamageDealtToChampions + ',' + p.magicDamageDealt + ',' + p.magicDamageDealtToChampions + ',' + p.trueDamageDealt + ',' + p.trueDamageDealtToChampions + ',' + p.totalDamageDealtToChampions + ',' + p.damageDealtToObjectives + ',' + p.totalDamageDealt + ',' + p.totalUnitsHealed + ',' + p.totalHeal + ',' + p.largestCriticalStrike + ',' + p.totalMinionsKilled + ',' + p.neutralMinionsKilled + ',' + p.neutralMinionsKilledTeamJungle + ',' + p.neutralMinionsKilledEnemyJungle + ',' + p.sightWardsBoughtInGame + ',' + p.visionWardsBoughtInGame + ',' + p.wardsKilled + ',' + p.wardsPlaced + ',' + p.visionScore + ',' + p.objectivePlayerScore + ',' + p.combatPlayerScore + ',' + p.totalPlayerScore + ',' + p.totalScoreRank + ',' + p.altarsCaptured + ',' + p.teamObjective + ',' + p.totalTimeCrowdControlDealt + ',' + p.timeCCingOthers + ',' + p.longestTimeSpentLiving + ',' + p.turretKills + ',' + p.damageDealtToTurrets + ',' + p.inhibitorKills + ',' + p.firstTowerAssist + ',' + p.firstTowerKill + ',' + p.firstBloodAssist + ',' + p.firstInhibitorKill + ',' + p.firstInhibitorAssist + ',' + p.firstBloodKill + ',' + p.champLevel + ',' + p.nodeNeutralize + ',' + p.nodeNeutralizeAssist + ',' + p.nodeCapture + ',' + p.nodeCaptureAssist + ',' + p.altarsNeutralized + ',' + p.goldEarned + ',' + p.goldSpent + ',' + p.physicalDamageTaken + ',' + p.magicalDamageTaken + ',' + p.trueDamageTaken + ',' + p.totalDamageTaken + ',' + p.perkPrimaryStyle + ',' + p.perkSubStyle + ',' + p.statPerk0 + ',' + p.statPerk1 + ',' + p.statPerk2 + ',' + p.damageSelfMitigated +')';
      if (i !== participantStats.length - 1){
        sql = sql + ',';
      }
    });

    await this.participantStatRepository.dataSource.execute(sql);
  }

  @get('/participant-stats/count', {
    responses: {
      '200': {
        description: 'ParticipantStat model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ParticipantStat)) where?: Where,
  ): Promise<Count> {
    return await this.participantStatRepository.count(where);
  }

  @get('/participant-stats', {
    responses: {
      '200': {
        description: 'Array of ParticipantStat model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ParticipantStat}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ParticipantStat)) filter?: Filter,
  ): Promise<ParticipantStat[]> {
    return await this.participantStatRepository.find(filter);
  }

  @patch('/participant-stats', {
    responses: {
      '200': {
        description: 'ParticipantStat PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() participantStat: ParticipantStat,
    @param.query.object('where', getWhereSchemaFor(ParticipantStat)) where?: Where,
  ): Promise<Count> {
    return await this.participantStatRepository.updateAll(participantStat, where);
  }

  @get('/participant-stats/{id}', {
    responses: {
      '200': {
        description: 'ParticipantStat model instance',
        content: {'application/json': {schema: {'x-ts-type': ParticipantStat}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ParticipantStat> {
    return await this.participantStatRepository.findById(id);
  }

  @patch('/participant-stats/{id}', {
    responses: {
      '204': {
        description: 'ParticipantStat PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() participantStat: ParticipantStat,
  ): Promise<void> {
    await this.participantStatRepository.updateById(id, participantStat);
  }

  @put('/participant-stats/{id}', {
    responses: {
      '204': {
        description: 'ParticipantStat PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() participantStat: ParticipantStat,
  ): Promise<void> {
    try {
      await this.participantStatRepository.findById(id);
      await this.participantStatRepository.replaceById(id, participantStat);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        await this.participantStatRepository.create(participantStat);
      } else {
        throw error;
      }
    }
  }

  @del('/participant-stats/{id}', {
    responses: {
      '204': {
        description: 'ParticipantStat DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.participantStatRepository.deleteById(id);
  }
}
