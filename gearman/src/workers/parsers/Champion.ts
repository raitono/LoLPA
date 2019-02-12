// 3rd party imports
import requestPromiseNative = require("request-promise-native");

// my imports
import { readFileAsync, request } from "../../util/common";
import * as WebServer from "../../util/web-server";

// globals
// tslint:disable-next-line:no-var-requires
const debug: any = require("debug")("lolpa-gearman:Champion");
const serverURLs = new WebServer.URLs();

/**
 * Reads a JSON file from the filesystem and import its data into the database.
 * @param {String} filePath Path to the JSON file containing Champion data
 */
export async function parse(filePath: string): Promise<void> {
    const champDataFile: Buffer = await readFileAsync(filePath);
    const champDataWrapper: IChampionFileWrapper = JSON.parse(champDataFile.toString());
    const champData: IChampionList = champDataWrapper.data;
    const championBatch: requestPromiseNative.OptionsWithUri[] = [];
    const championTagBatch: requestPromiseNative.OptionsWithUri[] = [];
    const championTags: Array<{championId: number; tags: string[]}> = [];
    const tags: string[] = [];

    // The spicy NONE ban
    championBatch.push({
        body: {
            armor: 0,
            armorperlevel: 0,
            attackdamage: 0,
            attackdamageperlevel: 0,
            attackrange: 0,
            attackspeed: 0,
            attackspeedperlevel: 0,
            championId: -1,
            crit: 0,
            critperlevel: 0,
            hp: 0,
            hpperlevel: 0,
            hpregen: 0,
            hpregenperlevel: 0,
            movespeed: 0,
            mp: 0,
            mpperlevel: 0,
            mpregen: 0,
            mpregenperlevel: 0,
            name: "None",
            partype: "None",
            spellblock: 0,
            spellblockperlevel: 0,
            title: "None",
        },
        json: true,
        method: "PUT",
        uri: serverURLs.Champion.put(-1),
    });

    // The JSON stores them as properties on the data object, not as an array.
    // So .forEach directly on the champData doesn't work.
    Object.keys(champData).forEach((key) => {
        const championId = parseInt(champData[key].key);
        championBatch.push({
            body: {
                armor: champData[key].stats.armor,
                armorperlevel: champData[key].stats.armorperlevel,
                attackdamage: champData[key].stats.attackdamage,
                attackdamageperlevel: champData[key].stats.attackdamageperlevel,
                attackrange: champData[key].stats.attackrange,
                attackspeed: champData[key].stats.attackspeed,
                attackspeedperlevel: champData[key].stats.attackspeedperlevel,
                championId,
                crit: champData[key].stats.crit,
                critperlevel: champData[key].stats.critperlevel,
                hp: champData[key].stats.hp,
                hpperlevel: champData[key].stats.hpperlevel,
                hpregen: champData[key].stats.hpregen,
                hpregenperlevel: champData[key].stats.hpregenperlevel,
                movespeed: champData[key].stats.movespeed,
                mp: champData[key].stats.mp,
                mpperlevel: champData[key].stats.mpperlevel,
                mpregen: champData[key].stats.mpregen,
                mpregenperlevel: champData[key].stats.mpregenperlevel,
                name: champData[key].name,
                partype: champData[key].partype,
                spellblock: champData[key].stats.spellblock,
                spellblockperlevel: champData[key].stats.spellblockperlevel,
                title: champData[key].title,
            },
            json: true,
            method: "PUT",
            uri: serverURLs.Champion.put(championId),
        });

        // Save tags
        championTags.push({championId, tags: champData[key].tags});

        // Toss tags all into one array
        champData[key].tags.forEach((tag: string) => {
            tags.push(tag);
        });
    });

    // Use the Set type to create a unique array of tags
    const uniqueTags = [...new Set(tags)];

    const existingTags: Array<{ id: number; name: string; }> = await request({
        json: true,
        method: "GET",
        uri: serverURLs.ChampionTag.getWhere("{\"name\": {\"inq\": " + JSON.stringify(uniqueTags) + "}}"),
    });

    // Only add tags that don't already exist
    uniqueTags.filter((t) => existingTags.findIndex((e) => e.name === t) === -1)
        .forEach((tag) => {
            championTagBatch.push({
                body: {
                    name: tag,
                },
                json: true,
                method: "POST",
                uri: serverURLs.ChampionTag.post(),
            });
        });

    await Promise.all([championBatch.map(request), championTagBatch.map(request)]);
    debug("Champions done");
    debug("Champion tags done");

    const dbTags = await request({
        json: true,
        method: "GET",
        uri: serverURLs.ChampionTag.get(),
    });

    const existingXrefs = await request({
        json: true,
        method: "GET",
        uri: serverURLs.XrefChampionTag.get(),
    });

    const tagXrefBatch = [];
    championTags.forEach((championTag) => {
        championTag.tags.forEach((cTag) => {
            const tagId = dbTags.filter((t) => t.name === cTag);
            // If a crossreference doesn't exist, create it
            if (tagId[0] && !existingXrefs.filter(
                (x) => x.championId === championTag.championId && x.tagId === tagId[0].id)[0]) {
                tagXrefBatch.push({
                    body: {
                        championId: championTag.championId,
                        tagId: tagId[0].id,
                    },
                    json: true,
                    method: "POST",
                    uri: serverURLs.XrefChampionTag.post(),
                });
            }
        });
    });
    await tagXrefBatch.map(request);
    debug("Champion Tag Xref done");
}

interface IChampionFileWrapper {
    type: string;
    format: string;
    version: string;
    data: IChampionList;
}

interface IChampionList {
    Aatrox: IChampion;
    Ahri: IChampion;
    Akali: IChampion;
    Alistar: IChampion;
    Amumu: IChampion;
    Anivia: IChampion;
    Annie: IChampion;
    Ashe: IChampion;
    AurelionSol: IChampion;
    Azir: IChampion;
    Bard: IChampion;
    Blitzcrank: IChampion;
    Brand: IChampion;
    Braum: IChampion;
    Caitlyn: IChampion;
    Camille: IChampion;
    Cassiopeia: IChampion;
    Chogath: IChampion;
    Corki: IChampion;
    Darius: IChampion;
    Diana: IChampion;
    Draven: IChampion;
    DrMundo: IChampion;
    Ekko: IChampion;
    Elise: IChampion;
    Evelynn: IChampion;
    Ezreal: IChampion;
    Fiddlesticks: IChampion;
    Fiora: IChampion;
    Fizz: IChampion;
    Galio: IChampion;
    Gangplank: IChampion;
    Garen: IChampion;
    Gnar: IChampion;
    Gragas: IChampion;
    Graves: IChampion;
    Hecarim: IChampion;
    Herimerdinger: IChampion;
    Illaoi: IChampion;
    Irelia: IChampion;
    Ivern: IChampion;
    Janna: IChampion;
    JarvanIV: IChampion;
    Jax: IChampion;
    Jayce: IChampion;
    Jhin: IChampion;
    Jinx: IChampion;
    Kaisa: IChampion;
    Kalista: IChampion;
    Karma: IChampion;
    Karthus: IChampion;
    Kassadin: IChampion;
    Katarina: IChampion;
    Kayle: IChampion;
    Kayn: IChampion;
    Kennen: IChampion;
    Khazix: IChampion;
    Kindred: IChampion;
    Kled: IChampion;
    KogMaw: IChampion;
    Leblanc: IChampion;
    LeeSin: IChampion;
    Leona: IChampion;
    Lissandra: IChampion;
    Lucian: IChampion;
    Lulu: IChampion;
    Lux: IChampion;
    Malphite: IChampion;
    Malzahar: IChampion;
    Maokai: IChampion;
    MasterYi: IChampion;
    MissFortune: IChampion;
    MonkeyKing: IChampion;
    Mordekaiser: IChampion;
    Morgana: IChampion;
    Nami: IChampion;
    Nasus: IChampion;
    Nautilus: IChampion;
    Neeko: IChampion;
    Nidalee: IChampion;
    Nocturne: IChampion;
    Nunu: IChampion;
    Olaf: IChampion;
    Orianna: IChampion;
    Ornn: IChampion;
    Pantheon: IChampion;
    Poppy: IChampion;
    Pyke: IChampion;
    Quinn: IChampion;
    Rakan: IChampion;
    Rammus: IChampion;
    RakSai: IChampion;
    Renekton: IChampion;
    Rengar: IChampion;
    Riven: IChampion;
    Rumble: IChampion;
    Ryze: IChampion;
    Sejuani: IChampion;
    Shaco: IChampion;
    Shen: IChampion;
    Shyvana: IChampion;
    Singed: IChampion;
    Sion: IChampion;
    Sivir: IChampion;
    Skarner: IChampion;
    Sona: IChampion;
    Soraka: IChampion;
    Swain: IChampion;
    Syndra: IChampion;
    TahmKench: IChampion;
    Taliyah: IChampion;
    Talon: IChampion;
    Taric: IChampion;
    Teemo: IChampion;
    Thresh: IChampion;
    Tristana: IChampion;
    Trundle: IChampion;
    Tryndamere: IChampion;
    TwistedFate: IChampion;
    Twitch: IChampion;
    Udyr: IChampion;
    Urgot: IChampion;
    Varus: IChampion;
    Vayne: IChampion;
    Veigar: IChampion;
    Velkoz: IChampion;
    Vi: IChampion;
    Viktor: IChampion;
    Vladimir: IChampion;
    Volibear: IChampion;
    Warwick: IChampion;
    Xayah: IChampion;
    Xerath: IChampion;
    XinZhao: IChampion;
    Yasuo: IChampion;
    Yorick: IChampion;
    Zac: IChampion;
    Zed: IChampion;
    Ziggs: IChampion;
    Zilean: IChampion;
    Zoe: IChampion;
    Zyra: IChampion;
}

interface IChampion {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: IChampionInfo;
    image: IChampionImage;
    tags: string[];
    partype: string;
    stats: IChampionStats;
}

interface IChampionInfo {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
}

interface IChampionImage {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

interface IChampionStats {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
}
