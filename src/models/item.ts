// Third party imports
import { Model } from 'objection';

export class Item extends Model {
    static get tableName() {
        return 'items';
    }
    static get idColumn() {
        return 'itemId';
    }

    static get relationMappings() {
        const ItemStat = require('./item_stat');

        return {
            stats: {
                relation: Model.HasManyRelation,
                modelClass: ItemStat,
                join: {
                    from: 'items.itemId',
                    to: 'item_stats.itemId'
                }
            }
        };
    }
}
