// Third party imports
import { Model } from 'objection';

export class Champion extends Model {
    static get tableName() {
        return 'champions';
    }
    static get idColumn() {
        return 'championId';
    }

    static get relationMappings() {
        const ChampionTag = require('./champion_tag');

        return {
            tags: {
                relation: Model.ManyToManyRelation,
                modelClass: ChampionTag,
                join: {
                    from: 'champions.championId',
                    through: {
                        from: 'xref_champions_tags.championId',
                        to: 'xref_champions_tags.tagId'
                    },
                    to: 'champion_tags.id'
                }
            }
        };
    }
}
