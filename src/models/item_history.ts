// Third party imports
import { Model } from 'objection';

export class ItemHistory extends Model {
    static get tableName() {
        return 'item_history';
    }
    static get idColumn() {
        return 'historyId';
    }
}
