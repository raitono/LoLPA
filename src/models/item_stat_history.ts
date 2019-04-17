// Third party imports
import { Model } from 'objection';

export class ItemStatHistory extends Model {
    static get tableName() {
        return 'item_stat_history';
    }
    static get idColumn() {
        return 'historyId';
    }
}
