// Third party imports
import { Model } from 'objection';

export class Queue extends Model {
    static get tableName() {
        return 'queues';
    }
    static get idColumn() {
        return 'queueId';
    }
}
