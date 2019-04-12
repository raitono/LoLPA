// Third party imports
import { Model } from 'objection';

export class Test extends Model {
    static get tableName() {
        return 'test';
    }
    test_value: string;
}
