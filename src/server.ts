import app from './app';
const debug: any = require('debug')('lolpa:server');

// Process.env will always be comprised of strings, so we typecast the port to a number.
const PORT:number = Number(process.env.PORT) || 3000;

export default app.listen(PORT, () => debug('Server listening...'));