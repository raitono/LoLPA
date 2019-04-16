// Third party imports
import { Model } from 'objection';

export class Summoner extends Model {
    static get tableName() {
        return 'summoners';
    }
}
