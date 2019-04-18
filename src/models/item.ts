// Third party imports
import { Model } from 'objection';

export class Item extends Model {
    static get tableName() {
        return 'items';
    }
    static get idColumn() {
        return 'itemId';
    }

    static get relationMappings() {
        const ItemStat = require('./item_stat');
        const Map = require('./map');
        const ItemTag = require('./item_tag');

        return {
            stats: {
                relation: Model.HasManyRelation,
                modelClass: ItemStat,
                join: {
                    from: 'items.itemId',
                    to: 'item_stats.itemId'
                }
            },
            maps: {
                relation: Model.ManyToManyRelation,
                modelClass: Map,
                join: {
                    from: 'items.itemId',
                    through: {
                        from: 'xref_items_maps.itemId',
                        to: 'xref_items_maps.mapId'
                    },
                    to: 'maps.mapId'
                }
            },
            tags: {
                relation: Model.ManyToManyRelation,
                modelClass: ItemTag,
                join: {
                    from: 'items.id',
                    through: {
                        from: 'xref_items_tags.itemId',
                        to: 'xref_items_tags.tagId'
                    },
                    to: 'item_tags.id'
                }
            }
        };
    }
}
