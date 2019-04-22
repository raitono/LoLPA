import { Summoner } from '../models/summoner';

export class SummonerService {
    static async getByName(name: string) {
        const sum = await Summoner.query().alias('s')
            .where({ name: name });

        return sum[0];
    }

    static async getAll() {
        return await Summoner.query();
    }
}
