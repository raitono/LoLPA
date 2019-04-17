// Third party imports
import { Model } from 'objection';

export class MatchList extends Model {
    static get tableName() {
        return 'match_lists';
    }
    static get idColumn() {
        return 'id';
    }
}
