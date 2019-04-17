// Third party imports
import { Model } from 'objection';

export class Item extends Model {
    static get tableName() {
        return 'items';
    }
    static get idColumn() {
        return 'itemId';
    }
}
