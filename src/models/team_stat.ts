// Third party imports
import { Model } from 'objection';

export class TeamStat extends Model {
    static get tableName() {
        return 'team_stats';
    }
    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const Match = require('./match');

        return {
            match: {
                relation: Model.BelongsToOneRelation,
                modelClass: Match,
                join: {
                    from: 'team_stats.gameId',
                    to: 'matches.gameId'
                }
            }
        };
    }
}
