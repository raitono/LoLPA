// Third party imports
import { Model } from 'objection';

export class Queue extends Model {
    static get tableName() {
        return 'queues';
    }
    static get idColumn() {
        return 'queueId';
    }

    static get relationMappings() {
        const Map = require('./map');

        return {
            map: {
                relation: Model.BelongsToOneRelation,
                modelClass: Map,
                join: {
                    from: 'queues.mapId',
                    to: 'maps.mapId'
                }
            }
        };
    }
}
