import { Metadata } from '../models/metadata'

export class MetadataService {
    static async getCurrentPatch() {
        return await Metadata.query().where({name: 'current_patch'}).select('value').first();
    }
}
