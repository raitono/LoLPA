// Third party imports
import { Model } from 'objection';

export class ItemStat extends Model {
    static get tableName() {
        return 'item_stats';
    }
    static get idColumn() {
        return 'id';
    }
}
