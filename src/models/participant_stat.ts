// Third party imports
import { Model } from 'objection';

export class ParticipantStats extends Model {
    static get tableName() {
        return 'participant_stats';
    }
    static get idColumn() {
        return 'id';
    }
}
