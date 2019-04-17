// Third party imports
import { Model } from 'objection';

export class Spell extends Model {
    static get tableName() {
        return 'spells';
    }
    static get idColumn() {
        return 'spellId';
    }
}
