// Third party imports
import { Model } from 'objection';

export class Match extends Model {
    static get tableName() {
        return 'matches';
    }
    static get idColumn() {
        return 'gameId';
    }

    static get relationMappings() {
        const Season = require('./season');
        const Queue = require('./queue');
        const Map = require('./map');

        return {
            season: {
                relation: Model.BelongsToOneRelation,
                modelClass: Season,
                join: {
                    from: 'matches.seasonId',
                    to: 'seasons.id'
                }
            },
            queue: {
                relation: Model.BelongsToOneRelation,
                modelClass: Queue,
                join: {
                    from: 'matches.queueId',
                    to: 'queues.queueId'
                }
            },
            map: {
                relation: Model.BelongsToOneRelation,
                modelClass: Map,
                join: {
                    from: 'matches.mapId',
                    to: 'maps.mapId'
                }
            }
        };
    }
}
