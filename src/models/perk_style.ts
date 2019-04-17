// Third party imports
import { Model } from 'objection';

export class PerkStyle extends Model {
    static get tableName() {
        return 'perk_styles';
    }
    static get idColumn() {
        return 'styleId';
    }
}
