// Third party imports
import { Model } from 'objection';

export class Map extends Model {
    static get tableName() {
        return 'maps';
    }
    static get idColumn() {
        return 'mapId';
    }
}
