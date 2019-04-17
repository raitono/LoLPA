// Third party imports
import { Model } from 'objection';

export class TeamBan extends Model {
    static get tableName() {
        return 'team_bans';
    }
    static get idColumn() {
        return 'id';
    }
}
