// Third party imports
import { Model } from 'objection';

export class ChampionTag extends Model {
    static get tableName() {
        return 'champion_tags';
    }
    static get idColumn() {
        return 'id';
    }
}
