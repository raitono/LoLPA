// Third party imports
import { Model } from 'objection';

export class ChampionHistory extends Model {
    static get tableName() {
        return 'champion_history';
    }
    static get idColumn() {
        return 'historyId';
    }
}
