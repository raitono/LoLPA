import { post, requestBody, HttpErrors } from '@loopback/rest';

// 3rd party imports
import del = require('del');
import * as fs from 'fs';
import https = require('https');
import tar = require('tar');

// my imports
import { kayn, request } from '../../util/common';
import * as WebServer from '../../util/web-server';
import Champion = require('../gearman/workers/parsers/Champion');
import Item = require('../gearman/workers/parsers/Item');
import RunesReforged = require('../gearman/workers/parsers/RunesReforged');
import SummonerSpell = require('../gearman/workers/parsers/SummonerSpell');

// globals
// tslint:disable-next-line:no-var-requires
const debug = require('debug')('lolpa:StaticData*');
const serverURLs = new WebServer.URLs();
let patchNumber: string = '';
const staticTarballURL: string = 'https://ddragon.leagueoflegends.com/cdn/dragontail-{version}.tgz';
const staticDataTempDir = "./temp";

export class StaticDataController {
  constructor() {
    if (!fs.existsSync(staticDataTempDir)) {
      fs.mkdirSync(staticDataTempDir);
    }
  }

  @post('/StaticData', {
    responses: {
      '204': {
        description: 'Static data update has been queued',
      },
      '422': {
        description: 'Version contains illegal characters',
      }
    },
  })
  async updateStaticData(@requestBody() version: string): Promise<void> {
    const versionPattern = new RegExp('^(\\d+\\.)?(\\d+\\.)?(\\d+)$');

    if (version.toLowerCase() === 'latest') {
      // Find latest version number
      const versions = await kayn.DDragon.Version.list();
      patchNumber = versions[0];
    } else if (versionPattern.test(version)) {
      patchNumber = version;
    } else {
      throw new HttpErrors.UnprocessableEntity('Version contains illegal characters');
    }

    await request({
      body: {
        id: 1,
        name: 'current_patch',
        value: patchNumber,
      },
      json: true,
      method: 'PUT',
      uri: serverURLs.MetaData.put(1),
    });

    debug('Updating to patch: ' + patchNumber);

    // Download and extract tarball to temp directory
    const tarballURL = staticTarballURL.replace('{version}', patchNumber);
    debug('terball link: ' + tarballURL);

    const tempTarballPath = staticDataTempDir + '/' + patchNumber + '.tgz';
    const tarballPathRoot = './' + patchNumber + '/data/en_US/';

    // For some reason, the Request package gives an Array Buffer error when trying to do this.
    // Guess we do it the old fashioned way.
    const file = fs.createWriteStream(tempTarballPath);
    https.get(tarballURL, (response) => {
      let cur = 0;
      let then = 0;
      const len = parseInt(response.headers['content-length'], 10);
      const total = len / 1048576; //1048576 - bytes in  1Megabyte
      debug('Total size: ' + total.toFixed(2) + ' mb');
      response.pipe(file);
      response.on('data', (chunk) => {
        cur += chunk.length;
        if (new Date().getTime() - then > 5000) {
          debug('Downloading ' + (100.0 * cur / len).toFixed(2) + '% ' + (cur / 1048576).toFixed(2) + ' mb');
          then = new Date().getTime();
        }
      });
      response.on('end', () => {
        debug('tarball saved');

        tar.extract({
          cwd: staticDataTempDir,
          file: tempTarballPath,
          gzip: true,
        },
          [
            tarballPathRoot + 'champion.json',
            tarballPathRoot + 'item.json',
            tarballPathRoot + 'runesReforged.json',
            tarballPathRoot + 'summoner.json',
          ],
          () => {
            debug('tarball extracted');
            this.parseAndLoad(patchNumber);
          },
        ).catch((err) => {
          debug('Oops');
          debug(err);
        });
      });
    });
  }

  async parseAndLoad(version: string) {
    const tempFilePath = staticDataTempDir + '/' + version + '/data/en_US/';

    await Promise.all([
      Champion.parse(tempFilePath + 'champion.json'),
      Item.parse(tempFilePath + 'item.json'),
      RunesReforged.parse(tempFilePath + 'runesReforged.json'),
      SummonerSpell.parse(tempFilePath + 'summoner.json'),
    ]);

    // Clean up
    // The glob pattern ** matches all children and the parent
    del.default([staticDataTempDir + '/' + version + '.tgz', staticDataTempDir + '/' + version + '/**'])
      .then(() => {
        debug('Clean up done');
      }).catch((err) => {
        debug(err);
      });
  }
}
