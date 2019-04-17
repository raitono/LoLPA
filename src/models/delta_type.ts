// Third party imports
import { Model } from 'objection';

export class DeltaType extends Model {
    static get tableName() {
        return 'delta_types';
    }
    static get idColumn() {
        return 'id';
    }
}
