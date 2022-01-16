require('dotenv').config();
import Env from "../env";

const config = {
  "username": Env.DB_USER,
  "password": Env.DB_PASS,
  "database": Env.DB_NAME,
  "host": Env.DB_HOST,
  "dialect": "mysql",
  "seederStorage": "sequelize"
}

// This must be module.exports
// just the export or export default keywords will not work
module.exports = {
  development: config,
  test: config,
  production: config
}
