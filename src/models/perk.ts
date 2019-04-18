// Third party imports
import { Model } from 'objection';

export class Perk extends Model {
    static get tableName() {
        return 'perks';
    }
    static get idColumn() {
        return 'perkId';
    }

    static get relationMappings() {
        const PerkStyle = require('./perk_style');

        return {
            perkStyle: {
                relation: Model.BelongsToOneRelation,
                modelClass: PerkStyle,
                join: {
                    from: 'perks.styleId',
                    to: 'perk_styles.styleId'
                }
            }
        };
    }
}
