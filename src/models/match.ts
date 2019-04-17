// Third party imports
import { Model } from 'objection';

export class Match extends Model {
    static get tableName() {
        return 'matches';
    }
    static get idColumn() {
        return 'gameId';
    }
}
