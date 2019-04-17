// Third party imports
import { Model } from 'objection';

export class Perk extends Model {
    static get tableName() {
        return 'perks';
    }
    static get idColumn() {
        return 'perkId';
    }
}
