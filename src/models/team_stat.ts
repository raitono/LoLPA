// Third party imports
import { Model } from 'objection';

export class TeamStat extends Model {
    static get tableName() {
        return 'team_stats';
    }
    static get idColumn() {
        return 'id';
    }
}
