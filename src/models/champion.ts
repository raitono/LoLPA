// Third party imports
import { Model } from 'objection';

export class Champion extends Model {
    static get tableName() {
        return 'champions';
    }
    static get idColumn() {
        return 'championId';
    }
}
