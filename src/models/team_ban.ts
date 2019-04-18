// Third party imports
import { Model } from 'objection';

export class TeamBan extends Model {
    static get tableName() {
        return 'team_bans';
    }
    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const Match = require('./match');
        const Champion = require('./champion');

        return {
            match: {
                relation: Model.BelongsToOneRelation,
                modelClass: Match,
                join: {
                    from: 'team_bans.gameId',
                    to: 'matches.gameId'
                }
            },
            champion: {
                relation: Model.HasOneRelation,
                modelClass: Champion,
                join: {
                    from: 'team_bans.championId',
                    to: 'champions.championId'
                }
            }
        };
    }
}
