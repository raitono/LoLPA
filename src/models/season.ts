// Third party imports
import { Model } from 'objection';

export class Season extends Model {
    static get tableName() {
        return 'seasons';
    }
    static get idColumn() {
        return 'seasonId';
    }
}
