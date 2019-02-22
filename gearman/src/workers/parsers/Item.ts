// 3rd party imports
import requestPromiseNative = require("request-promise-native");

// my imports
import { readFileAsync, request } from "../../util/common";
import { IItem, IItemFileWrapper } from "../../util/interfaces";
import * as WebServer from "../../util/web-server";

// globals
// tslint:disable-next-line:no-var-requires
const debug: any = require("debug")("lolpa-gearman:Item");
const serverURLs = new WebServer.URLs();

/**
 * Reads a JSON file from the filesystem and import its data into the database.
 * @param {String} filePath Path to the JSON file containing Item data
 */
export async function parse(filePath: string): Promise<void> {
    const itemDataFile: Buffer = await readFileAsync(filePath);
    const itemDataWrapper: IItemFileWrapper = JSON.parse(itemDataFile.toString());
    const itemData: IItem[] = Object.keys(itemDataWrapper.data).map((key) => {
            // The item JSON doesn't include the id in the data like the champion one does
            itemDataWrapper.data[key].id = parseInt(key);
            return itemDataWrapper.data[key] as IItem;
        });
    const itemBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemTagBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemStatBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemMapXrefBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemTagXrefBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemTagXrefRemovalBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemTags: Array<{ itemId: number; tagName: string; }> = [];
    let uniqueTags: string[] = [];
    const itemMaps: Array<{ itemId: number; mapId: number; enabled: boolean; }> = [];

    // Default item
    itemBatch.push({
        body: {
            goldBase: 0,
            goldSellsFor: 0,
            goldTotal: 0,
            itemId: 0,
            name: "None",
            purchasable: false,
        },
        json: true,
        method: "PUT",
        uri: serverURLs.Item.put(0),
    });

    itemData.forEach((item) => {
        itemBatch.push({
            body: {
                colloq: item.colloq,
                consumeOnFull: item.consumeOnFull,
                consumed: item.consumed,
                depth: item.depth,
                description: item.description,
                from: JSON.stringify(item.from),
                goldBase: item.gold.base,
                goldSellsFor: item.gold.sell,
                goldTotal: item.gold.total,
                hideFromAll: item.hideFromAll,
                inStore: item.inStore,
                into: JSON.stringify(item.into),
                itemId: item.id,
                name: item.name,
                plaintext: item.plaintext,
                purchasable: item.gold.purchasable,
                requiredAlly: item.requiredAlly,
                requiredChampion: item.requiredChampion,
                specialRecipe: item.specialRecipe,
                stacks: item.stacks,
            },
            json: true,
            method: "PUT",
            uri: serverURLs.Item.put(item.id),
        });

        item.tags.forEach((t) => {
            itemTags.push({itemId: item.id, tagName: t});
            uniqueTags.push(t);
        });

        Object.keys(item.maps).forEach((m) => {
            itemMaps.push({itemId: item.id, mapId: Number(m), enabled: item.maps[m]});
        });

        Object.keys(item.stats).forEach((type) => {
            itemStatBatch.push({
                body: {
                    exists: true,
                    itemId: item.id,
                    type,
                    value: item.stats[type],
                },
                json: true,
                method: "PUT",
                uri: serverURLs.ItemStat.put(item.id, type),
            });
        });
    });

    uniqueTags = [...new Set(uniqueTags)];

    await Promise.all(itemBatch.map(request));
    debug("Items added");

    const existingItemMaps = await request({
        json: true,
        method: "GET",
        uri: serverURLs.XrefItemMap.get(),
    });

    itemMaps.filter((m) => existingItemMaps.findIndex(
        (e) => e.itemId === m.itemId && e.mapId === m.mapId) === -1)
        .forEach((itemMap) => {
            itemMapXrefBatch.push({
                body: {
                    enabled: itemMap.enabled,
                    itemId: itemMap.itemId,
                    mapId: itemMap.mapId,
                },
                json: true,
                method: "POST",
                uri: serverURLs.XrefItemMap.post(),
            });
        });

    const existingTags = await request({
        json: true,
        method: "GET",
        uri: serverURLs.ItemTag.getWhere("{\"name\": {\"inq\": " + JSON.stringify(uniqueTags) + "}}"),
    });

    uniqueTags.filter((t) => existingTags.findIndex((e) => e.name === t) === -1)
        .forEach((tag) => {
            itemTagBatch.push({
                body: {
                    name: tag,
                },
                json: true,
                method: "POST",
                uri: serverURLs.ItemTag.post(),
            });
        });

    await Promise.all(itemTagBatch.map(request));
    debug("Item Tags added");

    // Efficiency!
    const tx = await Promise.all([
        request({
            json: true,
            method: "GET",
            uri: serverURLs.ItemTag.get(),
        }),
        request({
            json: true,
            method: "GET",
            uri: serverURLs.XrefItemTag.get(),
        }),
    ]);
    const dbTags: Array<{id: number, name: string}> = tx[0];
    let existingXrefs: Array<{id: number, itemId: number, tagId: number}> = tx[1];

    itemTags.forEach((itemTag) => {
        const tag = dbTags.filter((t) => t.name === itemTag.tagName)[0];

        // If a crossreference doesn't exist, create it
        if (tag && existingXrefs.findIndex(
            (x) => x.itemId === itemTag.itemId && x.tagId === tag.id) === -1) {
            itemTagXrefBatch.push({
                body: {
                    itemId: itemTag.itemId,
                    tagId: tag.id,
                },
                json: true,
                method: "POST",
                uri: serverURLs.XrefItemTag.post(),
            });
        }
    });

    await itemTagXrefBatch.map(request);
    debug("Item Tag Xrefs added");
    existingXrefs = await request({
        json: true,
        method: "GET",
        uri: serverURLs.XrefItemTag.get(),
    });

    // Remove tags that no longer exist
    existingXrefs.filter((x) =>
        itemTags.findIndex((i) => i.itemId === x.itemId
            && i.tagName === dbTags.filter((t) => t.id === x.tagId)[0].name) === -1,
    ).forEach((x) => {
        itemTagXrefRemovalBatch.push({
            json: true,
            method: "DELETE",
            uri: serverURLs.XrefItemTag.delete(x.id),
        });
    });

    // Batch all the ones that don't need any particular order last so that they can all run together
    await request({
        json: true,
        method: "POST",
        uri: serverURLs.ItemStat.resetExists(),
    });
    await Promise.all(itemStatBatch.concat(itemMapXrefBatch).concat(itemTagXrefRemovalBatch).map(request));
    debug("Item Map Xrefs added");
    debug("Item Tag Xrefs removed");
    Promise.all([request({
            json: true,
            method: "POST",
            uri: serverURLs.ItemStat.deleteMissing(),
        }),
    ]).then(() => { debug("Item Stats added"); });
}
