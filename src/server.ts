import app from './app';
import { AddressInfo } from 'net';
const debug: any = require('debug')('lolpa:server');

const server = app.listen(3001);
const port = (<AddressInfo>server.address()).port;

debug(`Server listening on port ${port}...`);
