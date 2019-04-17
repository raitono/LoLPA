// Third party imports
import { Model } from 'objection';

export class ItemTag extends Model {
    static get tableName() {
        return 'item_tags';
    }
    static get idColumn() {
        return 'id';
    }
}
