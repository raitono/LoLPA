// 3rd party imports
import requestPromiseNative = require("request-promise-native");

// my imports
import { readFileAsync, request } from "../../util/common";
import { IAPIItem, IItemFileWrapper, IDBXrefItemTag, IDBItem } from "../../util/interfaces";
import * as WebServer from "../../util/web-server";

// globals
// tslint:disable-next-line:no-var-requires
const debug: any = require("debug")("lolpa-gearman:Item*");
const serverURLs = new WebServer.URLs();

/**
 * Reads a JSON file from the filesystem and import its data into the database.
 * @param {String} filePath Path to the JSON file containing Item data
 */
export async function parse(filePath: string): Promise<void> {
    const itemDataFile: Buffer = await readFileAsync(filePath);
    const itemDataWrapper: IItemFileWrapper = JSON.parse(itemDataFile.toString());
    const itemData: IAPIItem[] = Object.keys(itemDataWrapper.data).map((key) => {
            // The item JSON doesn't include the id in the data like the champion one does
            itemDataWrapper.data[key].id = parseInt(key);
            return itemDataWrapper.data[key] as IAPIItem;
        });
    const itemBatch: IDBItem[] = [];
    const itemRemovalBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemTagBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemStatBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemStatRemovalBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemMapXrefBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemMapXrefRemovalBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemTagXrefBatch: IDBXrefItemTag[] = [];
    const itemTagXrefRemovalBatch: requestPromiseNative.OptionsWithUri[] = [];
    const itemTags: Array<{ itemId: number; tagName: string; }> = [];
    const itemStats: Array<{itemId: number, type: string, value: number}> = [];
    const itemMaps: Array<{ itemId: number; mapId: number; enabled: boolean; }> = [];
    const itemIds: number[] = [];
    let uniqueTags: string[] = [];

    // Default item
    itemIds.push(0);
    itemBatch.push({
        goldBase: 0,
        goldSellsFor: 0,
        goldTotal: 0,
        itemId: 0,
        name: "None",
        purchasable: false,
        version: "None",
    });

    itemData.forEach((item) => {
        itemIds.push(item.id);

        itemBatch.push({
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
                version: itemDataWrapper.version,
            });

        item.tags.forEach((t) => {
            itemTags.push({itemId: item.id, tagName: t});
            uniqueTags.push(t);
        });

        Object.keys(item.maps).forEach((m) => {
            itemMaps.push({itemId: item.id, mapId: Number(m), enabled: item.maps[m]});
        });

        Object.keys(item.stats).forEach((type) => {
            const stat = {
                itemId: item.id,
                type,
                value: item.stats[type],
                version: itemDataWrapper.version,
            };
            itemStatBatch.push({
                body: stat,
                json: true,
                method: "PUT",
                uri: serverURLs.ItemStat.put(item.id, type),
            });
            itemStats.push(stat);
        });
    });

    await request({
        body: itemBatch,
        json: true,
        method: "POST",
        uri: serverURLs.Item.batch(),
    });
    debug("Items added");

    // uniqueTags = [...new Set(uniqueTags)];

    // const existingTags = await request({
    //     json: true,
    //     method: "GET",
    //     uri: serverURLs.ItemTag.getWhere("{\"name\": {\"inq\": " + JSON.stringify(uniqueTags) + "}}"),
    // });

    // uniqueTags.filter((t) => existingTags.findIndex((e) => e.name === t) === -1)
    //     .forEach((tag) => {
    //         itemTagBatch.push({
    //             body: {
    //                 name: tag,
    //             },
    //             json: true,
    //             method: "POST",
    //             uri: serverURLs.ItemTag.post(),
    //         });
    //     });

    // await Promise.all(itemTagBatch.map(request));
    // debug("Item Tags added");

    // // Efficiency!
    // const tx = await Promise.all([
    //     request({
    //         json: true,
    //         method: "GET",
    //         uri: serverURLs.ItemTag.get(),
    //     }),
    //     request({
    //         json: true,
    //         method: "GET",
    //         uri: serverURLs.XrefItemTag.get(),
    //     }),
    // ]);
    // const dbTags: Array<{id: number, name: string}> = tx[0];
    // let existingTagXrefs: Array<{id: number, itemId: number, tagId: number}> = tx[1];

    // itemTags.forEach((itemTag) => {
    //     const tag = dbTags.filter((t) => t.name === itemTag.tagName)[0];

    //     // If a crossreference doesn't exist, create it
    //     if (tag && existingTagXrefs.findIndex(
    //         (x) => x.itemId === itemTag.itemId && x.tagId === tag.id) === -1) {
    //         itemTagXrefBatch.push({
    //             itemId: itemTag.itemId,
    //             tagId: tag.id,
    //             version: itemDataWrapper.version,
    //         });
    //     }
    // });

    // let existingItemMaps: Array<{id: number, itemId: number, mapId: number, enabled: boolean}> = await request({
    //     json: true,
    //     method: "GET",
    //     uri: serverURLs.XrefItemMap.get(),
    // });

    // // I'm 100% sure this works, but because of a bug in the loopback MySQL connector, it doesn't.
    // // See issue #19
    // itemMaps.filter((m) => existingItemMaps.findIndex(
    //     (e) => e.itemId === m.itemId && e.mapId === m.mapId && e.enabled === m.enabled) === -1)
    //     .forEach((itemMap) => {
    //         itemMapXrefBatch.push({
    //             body: {
    //                 enabled: itemMap.enabled,
    //                 itemId: itemMap.itemId,
    //                 mapId: itemMap.mapId,
    //                 version: itemDataWrapper.version,
    //             },
    //             json: true,
    //             method: "PUT",
    //             uri: serverURLs.XrefItemMap.put(itemMap.itemId, itemMap.mapId),
    //         });
    //     });

    // // Batch all the ones that don't need any particular order last so that they can all run together
    // await Promise.all([
    //     itemStatBatch.concat(itemMapXrefBatch).map(request),
    //     request({
    //         body: itemTagXrefBatch,
    //         json: true,
    //         method: "POST",
    //         uri: serverURLs.XrefItemTag.batch()
    //     })]
    // );
    // debug("Item Stats added");
    // debug("Item Map Xrefs added");
    // debug("Item Tag Xrefs added");

    // existingTagXrefs = await request({
    //     json: true,
    //     method: "GET",
    //     uri: serverURLs.XrefItemTag.get(),
    // });

    // // Remove entries that no longer exist
    // existingTagXrefs.filter((x) =>
    //     itemTags.findIndex((i) => i.itemId === x.itemId
    //         && i.tagName === dbTags.filter((t) => t.id === x.tagId)[0].name) === -1,
    // ).forEach((x) => {
    //     itemTagXrefRemovalBatch.push({
    //         json: true,
    //         method: "DELETE",
    //         uri: serverURLs.XrefItemTag.delete(x.id),
    //     });
    // });

    // const existingStats: Array<{id: number, itemId: number, type: string, value: number}> = await request({
    //     json: true,
    //     method: "GET",
    //     uri: serverURLs.ItemStat.get(),
    // });

    // existingStats.filter((e) =>
    //     itemStats.findIndex((s) => s.itemId === e.itemId && s.type === e.type && s.value === e.value) === -1)
    // .forEach((e) => {
    //     itemStatRemovalBatch.push({
    //         json: true,
    //         method: "DELETE",
    //         uri: serverURLs.ItemStat.delete(e.id),
    //     });
    // });

    // const existingItems = await request({
    //     json: true,
    //     method: "GET",
    //     uri: serverURLs.Item.get(),
    // });

    // const existingItemIds: number[] = existingItems.map((i) => {
    //     return i.itemId;
    // });

    // existingItemIds.filter((e) => itemIds.findIndex((i) => i === e) === -1)
    // .forEach((e) => {
    //     itemRemovalBatch.push({
    //         json: true,
    //         method: "DELETE",
    //         uri: serverURLs.Item.delete(e),
    //     });
    // });

    // existingItemMaps = await request({
    //     json: true,
    //     method: "GET",
    //     uri: serverURLs.XrefItemMap.get(),
    // });

    // existingItemMaps.filter((e) => itemMaps.findIndex((m) => m.itemId === e.itemId && m.mapId === e.mapId) === -1)
    // .forEach((e) => {
    //     itemMapXrefRemovalBatch.push({
    //         json: true,
    //         method: "DELETE",
    //         uri: serverURLs.XrefItemMap.delete(e.id),
    //     });
    // });

    // // Batch removals together
    // await Promise.all(itemStatRemovalBatch.concat(itemTagXrefRemovalBatch)
    //     .concat(itemMapXrefRemovalBatch).map(request));
    // debug("Item Stats removed");
    // debug("Item Tag Xrefs removed");
    // debug("Item Map Xrefs removed");

    // Promise.all(itemRemovalBatch.map(request)).then(() => debug("Items removed"));
}
