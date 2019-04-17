// Third party imports
import { Model } from 'objection';

export class ParticipantTimelineDelta extends Model {
    static get tableName() {
        return 'participant_timeline_deltas';
    }
    static get idColumn() {
        return 'id';
    }
}
