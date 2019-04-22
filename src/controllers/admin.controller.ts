import * as Router from 'koa-router';

import { MetadataService } from '../services/metadata.service';

export class AdminController {
    static async patch(ctx:Router.RouterContext) {
        const patch = await MetadataService.getCurrentPatch();

        ctx.body = patch;
    }
}
