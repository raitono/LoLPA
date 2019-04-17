// Third party imports
import { Model } from 'objection';

export class Participant extends Model {
    static get tableName() {
        return 'participants';
    }
    static get idColumn() {
        return 'id';
    }
}
