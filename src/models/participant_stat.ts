// Third party imports
import { Model } from 'objection';

export class ParticipantStats extends Model {
    static get tableName() {
        return 'participant_stats';
    }
    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const Participant = require('./participant');

        return {
            participant: {
                relation: Model.BelongsToOneRelation,
                modelClass: Participant,
                join: {
                    from: 'participant_stats.participantId',
                    to: 'participants.id'
                }
            }
        };
    }
}
