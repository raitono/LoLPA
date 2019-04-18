// Third party imports
import { Model } from 'objection';

export class Participant extends Model {
    static get tableName() {
        return 'participants';
    }
    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const Match = require('./match');
        const Champion = require('./champion');
        const Spell = require('./spell');
        const Item = require('./item');
        const Perk = require('./perk');

        return {
            match: {
                relation: Model.BelongsToOneRelation,
                modelClass: Match,
                join: {
                    from: 'participants.gameId',
                    to: 'matches.gameId'
                }
            },
            champion: {
                relation: Model.HasOneRelation,
                modelClass: Champion,
                join: {
                    from: 'participants.championId',
                    to: 'champions.championId'
                }
            },
            spell1: {
                relation: Model.HasOneRelation,
                modelClass: Spell,
                join: {
                    from: 'participants.spell1Id',
                    to: 'spells.spellId'
                }
            },
            spell2: {
                relation: Model.HasOneRelation,
                modelClass: Spell,
                join: {
                    from: 'participants.spell2Id',
                    to: 'spells.spellId'
                }
            },
            items: {
                relation: Model.ManyToManyRelation,
                modelClass: Item,
                join: {
                    from: 'participants.id',
                    through: {
                        from: 'xref_participants_items.participantId',
                        to: 'xref+participants_items.itemId'
                    },
                    to: 'items.itemId'
                }
            },
            perks: {
                relation: Model.ManyToManyRelation,
                modelClass: Perk,
                join: {
                    from: 'participants.id',
                    through: {
                        from: 'xref_participants_perks.participantId',
                        to: 'xref+participants_perks.perkId'
                    },
                    to: 'perks.perkId'
                }
            }
        };
    }
}
