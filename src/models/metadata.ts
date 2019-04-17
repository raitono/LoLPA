// Third party imports
import { Model } from 'objection';

export class Metadata extends Model {
    static get tableName() {
        return 'metadata';
    }
    static get idColumn() {
        return 'id';
    }
}
